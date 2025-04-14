import { createServer } from "node:http";
import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import { Server } from "socket.io";
import cors from "cors";
import userRouter from "./modules/user/user.router.js";
import userService from "./modules/user/user.service.js";
import { socketHandler } from "./modules/socket/socket.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: "*"
  })
);

if (process.env.NODE_ENV.trim() === "development") {
  app.use(morgan("tiny"));
}

app.use("/api", userRouter)


socketHandler(io)


app.use((error, res, req, next)=>{
  res.status(400).send({
    message: error.message
  })
})
export default server;
