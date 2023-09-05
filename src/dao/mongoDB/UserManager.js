import crypto from "crypto";
import { dirname } from "path";
import { fileURLToPath } from "url";
import userModel from "../../schemas/users.schema.js";
import mongoose from "mongoose";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default class UserManager {
  
    constructor() {}

  getUsers = async () => {
    
    try {
      const users = await UserModel.find();
      return users;
    } catch (e) {
      return [];
    }
  };
  // minor
  updateUser = async (username, profile_picture) => {
    
    const user = await UserModel.findOne({ username });
    user.user.avatar = profile_picture;
    await user.save();
    const userObject = user.toObject();
    const userJSON = user.toJSON();
    const products = await model.find({});
    res.render("index", { prod: products });
  };
  // * usuario = {nombre, apellido, username, password, avatar}
  createUser = async (user) => {
    
    const { nombre, apellido, username, password } = user
    user.salt = crypto.randomBytes(128).toString("base64");
    user.password = crypto
      .createHmac("sha256", user.salt)
      .update(user.password)
      .digest("hex");
    userModel.create(user);
    const createUser = await userModel.create([user]);
    return createUser;
  };
  // *
  validateUser = async (username, password) => {
    
    const user = await userModel.findOne({ username });
    if (!user) return "Error, usuario no existe!";

    const loginHash = crypto
      .createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");

    return loginHash == user.password
      ? user.toObject()
      : false;
  };
}