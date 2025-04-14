import userService from "./user.service.js";

class UserController {
  #_service;
  constructor() {
    this.#_service = userService;
  }

  getAllUsers = async (req, res) => {
    const data = await this.#_service.getAllUsers();
    res.send(data);
  };
  createUser = async (req, res) => {
    try {
      const { name } = req.body;
      const data = await userService.createUser(name);
      res.json(data);
    } catch (error) {
      res.status(409).json({
        message: error.message
      });
    }
  };
  

}

export default new UserController();
