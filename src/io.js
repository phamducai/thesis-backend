const debug = require("debug")("io");

const { createClient } = require("redis");
const redisClient = createClient();
redisClient.on("connect", () => debug("connect"));
redisClient.on("ready", () => debug("ready"));
redisClient.on("end", () => debug("end"));
redisClient.on("error", (error) => debug("error", error.message));
redisClient.on("reconnecting", () => debug("reconnecting"));
redisClient.connect();

const subscribedTopics = new Set();

const { Server } = require("socket.io");
let io = new Server();

function subscribeCallback(message, channel) {
  // debug("emit to", channel, "message", message);
  io.in(channel).emit("message", channel, message);
}

io.on("connection", (socket) => {
  const socketId = socket.id;
  socket.on("disconnect", (reason) => {
    // debug(socketId, "disconnected, reason:", reason);
  });
  socket.on("subscribe", (topic) => {
    // debug(socketId, "subscribed to", topic);
    socket.join(topic);
    if (!subscribedTopics.has(topic)) {
      redisClient.subscribe(topic, subscribeCallback);
      subscribedTopics.add(topic);
      // debug("system subscribed to", topic);
    }
  });
  socket.on("unsubscribe", (topic) => {
    // debug(socketId, "unsubscribed from", topic);
    socket.leave(topic);
  });
});
io.of("/").adapter.on("delete-room", (room) => {
  if (subscribedTopics.has(room)) {
    redisClient.unsubscribe(room);
    subscribedTopics.delete(room);
    // debug(`system unsubscribed from ${room}`);
  }
});

module.exports = io;
