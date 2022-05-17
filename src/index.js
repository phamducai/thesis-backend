const db =require('./db');
const app = require('./app');
require('./mqtt')
const PORT = 8080;

async function main() {
  await db();
  app.listen(PORT, () => console.log(`server running ${PORT}`));
}

main().catch((error) => {
  console.log(error.message);
  process.exit(1);
});
