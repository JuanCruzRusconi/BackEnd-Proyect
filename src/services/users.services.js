import UsersDAO from "../dao/mongoDB/users.mongo.dao.js";
import bcrypt from "bcrypt";
import UsersDTOReturn from "../dto/users.dto.js";
import * as CartsServices from "../services/carts.services.js";

const UsersDao = new UsersDAO();

export const GetAllUsers = async () => {

    try {
        const users = await UsersDao.getUsers();
        const usersDto = users.map((user) => new UsersDTOReturn(user));
        return usersDto;
      } catch (e) {
        return [];
      }
};

export const GetUserById = async (id) => {

    try {
        const user = await UsersDao.getUserById(id);
        //const userDto = new UsersDTOReturn(user);
        return user;
    } catch (e) {
        console.log(e);
    }
};

export const GetUserByUsername = async (username) => {

    try {
        const user = await UsersDao.getUserByUsername(username);
        const userDto = new UsersDTOReturn(user);
        return userDto;
    } catch (e) {
        console.log(e);
    }
};

export const UpdateUser = async () => {

    try {
    const user = await UsersDao.updateUserProfile(username);
    user.user.avatar = profile_picture;
    await user.save();
    const userObject = user.toObject();
    const userJSON = user.toJSON();
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

    // Crear un nuevo carrito asociado al usuario
    const userCart = await CartsServices.PostUserCart(newUser);

    // Utilizar updateOne para asociar el carrito al usuario
    await UsersDao.updateUserCart(newUser, userCart);

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
};

export const PurchaseOrder = async (user, ticket) => {

    try {
        const ticketUser = await UsersDao.updateUserTicket(user, ticket);
        return ticketUser;
    } catch (e) {
        throw e;
    }
};
