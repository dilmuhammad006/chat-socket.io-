import { config } from "dotenv";
import server from "./app.js";
import { connectDb } from "./config/app.config.js";
config();
const port = process.env.APP_PORT || 4000;

await connectDb()

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
