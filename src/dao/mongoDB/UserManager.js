import crypto from "crypto";
import { dirname } from "path";
import { fileURLToPath } from "url";
import userModel from "../../schemas/users.schema.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default class UserManager {

    constructor () {}

    getUsers = async () => {

        try {
            await userModel.find();
            return users;
          } catch (e) {
            //return [];
          }
    };

    getUserById = async (id) => {

        try {
            const user = await userModel.findById(id);
            return user;
        } catch {

        }
    };

    getUserByUsername = async (username) => {

        try {
            const user = await userModel.findOne({username});
            return user;
        } catch {

        }
    };

    updateUser = async () => {

        const user = await userModel.findOne({ username });
        user.user.avatar = profile_picture;
        await user.save();
        const userObject = user.toObject();
        const userJSON = user.toJSON();
        const products = await model.find({});
        res.render("index", { prod: products });
    };

   /*// ------- crypto ------- // 
    createUser2 = async (user) => {

        const { nombre, apellido, username, passwor } = user;
        user.salt = crypto.randomBytes(128).toString("base64");
        user.password = crypto
            .createHmac("sha256", user.salt)
            .update(user.password)
            .digest("hex");
        const createUser = await userModel.create([user]);
        return createUser;
    };
    
    validateUser = async (username, password) => {

        const user = await userModel.findOne({ username });
        if (!user) return "Error, usuario no existe!";

        const loginHash = crypto
            .createHmac("sha256", user.salt)
            .update(password)
            .digest("hex");

        return loginHash == user.password ?
            user.toObject() :
            false;
    };*/

    // ------- bcrypt ------- // 
    createUser = async (user) => {
        
        const { nombre, apellido, username, password } = user;
        user.salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, user.salt);
        const newUser = await userModel.create(user);
        return newUser;
    };

    validateUser = async (username, password) => {

        const validateUser = await userModel.findOne({ username });
        if(!validateUser) return false;
        const passw = await bcrypt.compare(password, validateUser.password);
        return passw ? validateUser.toObject() : false;
    };   
}

