import dotenv from "dotenv";
import Connectiondb from "./Connetiondb.js";
import app from "./app.js";

dotenv.config();

const PORT = 8080;

import client from "./mqtt.js";

async function main() {
  await Connectiondb();
  app.listen(PORT, () => console.log(`server running ${PORT}`));
}

main().catch((error) => {
  console.log(error.message);
  process.exit(1);
});
