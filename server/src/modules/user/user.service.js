import messageModel from "../message/message.model.js";
import User from "./user.model.js";
class UserService {
  constructor() {
    this.userModel = User;
  }

  getAllUsers = async (req, res) => {
    const users = await this.userModel.find();

    return {
      message: "Success",
      count: users.length,
      data: users,
    };
  };

  createUser = async (name) => {

    const foundedUser = await this.userModel.findOne({name});

    if(foundedUser){
      throw new Error("User already exists")
    }
    const newUser = await this.userModel.create({ name });
    await messageModel.create({
      type: "join_message",
      user: newUser._id
    })
    return {
      message: "Yaratildi",
      data: newUser,
    };
  };
}

export default new UserService();
