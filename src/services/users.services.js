import UsersDAO from "../dao/mongoDB/users.mongo.dao.js";
import bcrypt from "bcrypt";

const UsersDao = new UsersDAO();

export const GetAllUsers = async () => {

    try {
        const users = await UsersDao.getUsers();
        return users;
      } catch (e) {
        return [];
      }
};

export const GetUserById = async (id) => {

    try {
        const user = await UsersDao.getUserById(id);
        return user;
    } catch (e) {
        console.log(e);
    }
};

export const GetUserByUsername = async (username) => {

    try {
        const user = await UsersDao.getUserByUsername(username);
        return user;
    } catch (e) {
        console.log(e);
    }
};

export const UpdateUser = async () => {

    try {
    const user = await UsersDao.updateUser(username);
    user.user.avatar = profile_picture;
    await user.save();
    const userObject = user.toObject();
    const userJSON = user.toJSON();
    const products = await model.find({});
    res.render("index", { prod: products });
    } catch (e) {
        console.log(e);
    }
};

// ------- bcrypt ------- // 
export const CreateUser = async (user) => {
    
    try {
    const { nombre, apellido, username, password } = user;
    user.salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, user.salt);
    const newUser = await UsersDao.createUser(user);
    return newUser;
    } catch (e) {
        console.log(e);
    }
};

export const ValidateUser = async (username, password) => {

    try {
    const validateUser = await UsersDao.validateUser(username);
    if(!validateUser) return false;
    const passw = await bcrypt.compare(password, validateUser.password);
    return passw ? validateUser.toObject() : false;
    } catch (e) {
        console.log(e);
    }
};

export const UserRole = async () => {

    try {
        const user = await UsersDao.getUserByUsername(username);
        const role = user.role;
        return role;
    } catch (e) {
        console.log(e);
    }
}
