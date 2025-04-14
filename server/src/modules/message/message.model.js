import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    text: {
      type: mongoose.SchemaTypes.String,
    },
    type: {
      type: mongoose.SchemaTypes.String,
      enum: ["message", "join_message"],
      default: "message",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },      
  },
  {
    collection: "messages",
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Message", MessageSchema);
