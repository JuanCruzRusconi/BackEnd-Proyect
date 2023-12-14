import UsersRepository from "../repositories/users.repositories.js";
import bcrypt from "bcrypt";
import CartsServices from "./carts.services.js";

const CartService = new CartsServices();

export default class UsersServices {

    constructor () {
        this.repository = new UsersRepository();
    };

    CreateUser = async (user, next) => {
    
        try {
            const { nombre, apellido, username, password } = user;
            user.salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, user.salt);
            const newUser = await this.repository.createUser(user, next);
            // Crear un nuevo carrito asociado al usuario
            const userCart = await CartService.CreateUserCart(newUser, next);
            // Utilizar updateOne para asociar el carrito al usuario
            await this.repository.updateUserCart(newUser, userCart, next);
            return newUser;
        } catch (error) {
            error.from = "UsersServices";
            return next(error);
        }
    };

    UpdateUserTicket = async (user, ticket, next) => {

        try {
            const ticketUser = await this.repository.updateUserTicket(user, ticket, next);
            return ticketUser;
        } catch (error) {
            error.from = "UsersServices";
            return next(error);
        }
    };

    GetUsers = async (next) => {

        try {
            const users = await this.repository.getUsers(next);
            return users;
        } catch (error) {
            error.from = "UsersServices";
            return next(error);
        }
    };

    GetUserById = async (id, next) => {

        try {
            const user = await this.repository.getUserById(id, next);
            return user;
        } catch (error) {
            error.from = "UsersServices";
            return next(error);
        }
    };

    GetUserByUsername = async (username, next) => {

        try {
            const user = await this.repository.getUserByUsername(username, next);
            return user;
        } catch (error) {
            error.from = "UsersServices";
            return next(error);
        }
    };

    UpdateUser = async (username, data, next) => {

        try {
            const user = await this.repository.updateUserProfile(username, data, next);
            user.user.avatar = profile_picture;
            await user.save();
            const userObject = user.toObject();
            const userJSON = user.toJSON();
        } catch (error) {
            error.from = "UsersServices";
            return next(error);
        }
    };

    ValidateUser = async (username, password, next) => {

        try {
            const validateUser = await this.GetUserByUsername(username, next);
            if(!validateUser) return false;
            const passw = await bcrypt.compare(password, validateUser.password);
            return passw ? validateUser.toObject() : false;
        } catch (error) {
            error.from = "UsersServices";
            return next(error);
        }
    };

    UserRole = async (next) => {

        try {
            const user = await this.GetUserByUsername(username, next);
            const role = user.role;
            return role;
        } catch (error) {
            error.from = "UsersServices";
            return next(error);
        }
    };

    UpdateUserRole = async (id, data, next) => {

        try {
            let role
                if(data === 'user') {
                role = "premium";
            } else {
                role = "user";
            }
            const user = await this.repository.updateUserRole(id, role, next);
            return user;
        } catch (error) {
            error.from = "UsersServices";
            return next(error);
        }
    };

    DeleteUser = async (id, next) => {
        
        try {
            const deleteUser = await this.repository.deleteUser(id, next);
            return deleteUser;
        } catch (error) {
            error.from = "UsersServices";
            return next(error);
        }
    };

    DeleteTicketUser = async (id, ticket, next) => {
        
        try {
            const deleteTicket = await this.repository.deleteTicketUser(id, ticket, next);
            return deleteTicket;
        } catch (error) {
            error.from = "UsersServices";
            return next(error);
        }
    };

}




