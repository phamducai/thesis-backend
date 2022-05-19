require("dotenv").config();
const db = require("./db");

require("./mqtt");

const PORT = 8080;
const httpServer = require("http").createServer(require("./app"));
const io = require("./io");

async function main() {
  await db();
  io.attach(httpServer);
  httpServer.listen(PORT, () => console.log(`server running ${PORT}`));
}

main().catch((error) => {
  console.log(error.message);
  process.exit(1);
});
