import messageModel from "../message/message.model.js";
import userModel from "../user/user.model.js";

export const socketHandler = (io) => {
  const getAllMessages = async () => {
    return await messageModel
      .find()
      .sort({ createdAt: 1 })
      .populate("user");
  };

  io.on("connection", async (socket) => {
    const messages = await getAllMessages();
    socket.emit("message", messages);

    socket.on("typing", async (data) => {
      const user = await userModel.findById(data.user);
      socket.broadcast.emit("typing", user);
    });

    socket.on("message", async (data) => {
      await messageModel.create({
        text: data.text,
        user: data.user,
        type: "message",
      });

      const messages = await getAllMessages();
      io.emit("message", messages);
    });

    socket.on("join", async (data) => {
      await messageModel.create({
        type: "join_message",
        user: data.user,
      });

      const messages = await getAllMessages();
      io.emit("message", messages);
    });
  });
};
