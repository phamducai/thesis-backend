const mqtt = require("mqtt");

const Device = require("./models/Device");
const Record = require("./models/Record");

const socket = require("./contextEmitter");
// const MQTT_Broker = "192.168.137.1";
//mqtt://broker.hivemq.com

const client = mqtt.connect("", {
  reconnectPeriod: 0,
});

client.on("error", (error) => console.log("error", error.message));

client.on("connect", () => {
  console.log("connect");

  client.subscribe("mybk/up", (error) => {
    if (error) return console.log("error", error.message);
  });
});

client.on("message", async (topic, msgBuff) => {
  // msgBuff is a buffer, so convert it to string
  const msgStr = msgBuff.toString();

  console.log(msgStr);
  let msgObj;
  try {
    msgObj = JSON.parse(msgStr);
  } catch (error) {
    console.log(error.message);
    return;
  }

  const { action } = msgObj;
  if (action === "provision") {
    console.log("provision");
    const { dev_addr, type } = msgObj;

    const device = await Device.create({
      dev_addr: dev_addr,
      type: type,
    });
  } else if (action === "telemetry") {
    const { action, dev_addr, timestamp, ...attributes } = msgObj;
    const foundDevice = await Device.findOne({ dev_addr: dev_addr }).exec();

    const deviceId = foundDevice._id;
    // Update Device in DB
    await Device.updateOne({ _id: deviceId }, attributes);

    for (const attribute in attributes) {
      socket.publish(
        `telemetry.${deviceId}.${attribute}`,
        JSON.stringify({
          value:
            typeof attributes[attribute] === "number"
              ? Math.round(attributes[attribute] * 100) / 100
              : attributes[attribute],
          timestamp: new Date(timestamp * 1000 + 25200000),
        })
      );
    }

    // add Record in DB

    const records = Object.keys(attributes).map((attribute) => ({
      deviceId: deviceId,
      attribute: attribute,
      sample: {
        timestamp: new Date(timestamp * 1000 + 25200000),
        value:
          typeof attributes[attribute] === "number"
            ? Math.round(attributes[attribute] * 100) / 100
            : attributes[attribute],
      },
    }));

    await Record.insertMany(records);
  }
});

module.exports = client;
