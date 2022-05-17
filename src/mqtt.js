const mqtt =require('mqtt');

const Device =require('./models/Device');
const Record =require('./models/Record');

const client = mqtt.connect("mqtt://test.mosquitto.org", {
  reconnectPeriod: 0,
});

client.on("error", (error) => {
  console.log("error", error.message);
});

client.on("connect", () => {
  console.log("connect");

  client.subscribe("up/+", (error) => {
    if (error) return console.log("error", error.message);

    console.log("subscribed success");
  });
});

client.on("message", async (topic, msgBuff) => {
  // msgBuff is a buffer, so convert it to string
  const msgStr = msgBuff.toString();

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
    const { deviceName, deviceType} = msgObj;

    const device = await Device.create({
      name: deviceName,
      type: deviceType,
    });
    client.publish(
      "down/" + device._id,
      JSON.stringify({ action: "provision", deviceId: device._id })
    );
  } else if (action === "telemetry") {
    console.log("telemetry");
    const deviceId = topic.slice(3);
    const { channels } = msgObj;

    // Update Device in DB
    await Device.updateOne({ _id: deviceId }, { attributes: { channels } });

    // add Record in DB
    const records = Object.keys(channels).map((attribute) => ({
      deviceId: deviceId,
      attribute: attribute,
      sample: {
        timestamp: new Date(),
        value: channels[attribute],
      },
    }));
    await Record.insertMany(records);
  }
});

module.exports=  client;
