import Connectiondb from "./db.js";
import app from "./app.js";

const PORT = 8080;

async function main() {
  await Connectiondb();
  app.listen(PORT, () => console.log(`server running ${PORT}`));
}

main().catch((error) => {
  console.log(error.message);
  process.exit(1);
});
