import messageModel from "../message/message.model.js";
import userModel from "../user/user.model.js";

export const socketHandler = (io) => {
  const getAllMessages = async (roomId) => {
    return await messageModel
      .find({ room: roomId })
      .sort({ createdAt: 1 })
      .populate("user");
  };

  io.on("connection", async (socket) => {
    const messages = await getAllMessages();
    io.emit("message", messages);

    socket.on("typing", async ({ user, roomId }) => {
      const foundUser = await userModel.findById(user._id || user);
      socket.to(roomId).emit("typing", foundUser);
    });

    socket.on("message", async ({ user, roomId, text }) => {
      await messageModel.create({
        text,
        user,
        type: "message",
        room: roomId,
      });

      const messages = await getAllMessages(roomId);
      io.to(roomId).emit("message", messages);
    });

    socket.on("join", async (data) => {
      await messageModel.create({
        type: "join_message",
        user: data.user,
      });

      const messages = await getAllMessages();
    });
    socket.on("joinRoom", async ({ roomId, user }) => {
      socket.join(roomId);

      const existsMessage = await messageModel.findOne({
        type: "join_message",
        room: roomId,
        user: user._id,
      });

      if (!existsMessage) {
        await messageModel.create({
          type: "join_message",
          user: user._id,
          room: roomId,
        });
      }

      const messages = await getAllMessages(roomId);
      io.to(roomId).emit("message", messages);
    });
  });
};
