import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      unique: true,
    },
    messages: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    collection: "users",
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", UserSchema);
