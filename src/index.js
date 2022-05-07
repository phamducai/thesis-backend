import db from "./db.js";
import app from "./app.js";

import mqtt from "./mqtt.js"

const PORT = 8080;

async function main() {
  await db();
  app.listen(PORT, () => console.log(`server running ${PORT}`));
}

main().catch((error) => {
  console.log(error.message);
  process.exit(1);
});
