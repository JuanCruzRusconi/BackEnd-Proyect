import crypto from "crypto";
import { dirname } from "path";
import { fileURLToPath } from "url";
import userModel from "../../schemas/users.schema.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default class UsersDAO {

    constructor () {}

    getUsers = async () => {

        try {
            const users = await userModel.find();
            return users;
          } catch (e) {
            //return [];
          }
    };

    getUserById = async (id) => {

        try {
            const user = await userModel.findById(id);
            return user;
        } catch (e) {
            console.log(e);
        }
    };

    getUserByUsername = async (username) => {

        try {
            const user = await userModel.findOne({username});
            return user;
        } catch (e) {
            console.log(e);
        }
    };

    updateUser = async () => {

        try {
        const user = await userModel.findOne({ username });
        return user;
        } catch (e) {
            console.log(e);
        }
    };

   /*// ------- crypto ------- // 
    createUser = async (user) => {

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
        
        try {
        const newUser = await userModel.create(user);
        return newUser;
        } catch (e) {
            console.log(e);
        }
    };

    validateUser = async (username, password) => {

        try {
        const validateUser = await userModel.findOne({ username });
        return validateUser;
        } catch (e) {
            console.log(e);
        }
    };   
}

