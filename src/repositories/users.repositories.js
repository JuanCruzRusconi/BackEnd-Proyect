import dao from "../dao/factory.dao.js";
import UsersDTOReturn from "../dto/users.dto.js";

const { User } = dao;

export default class UsersRepository { 

    constructor () {
        this.model = new User();
    };

    createUser = async (user, next) => {
        
        try {
            let response = await this.model.createUser(user, next);
            return response;
        } catch (error) {
            error.from = "UsersRepository";
            return next(error);
        }
    };

    getUsers = async (next) => {

        try {
            let users = await this.model.getUsers(next);
            const responseDto = users.map((user) => new UsersDTOReturn(user));
            return responseDto;
        } catch (error) {
            error.from = "UsersRepository";
            return next(error);
        }
    };

    getUserById = async (id, next) => {

        try {
            let user = await this.model.getUserById(id, next);
            const responseDto = new UsersDTOReturn(user);
            return responseDto;
        } catch (error) {
            error.from = "UsersRepository";
            return next(error);
        }
    };

    getUserByUsername = async (username, next) => {

        try {
            let response = await this.model.getUserByUsername(username, next);
            return response;
        } catch (error) {
            error.from = "UsersRepository";
            return next(error);
        }
    };

    updateUserProfile = async (username, data, next) => {

        try {
            const response = await this.model.updateUserProfile(username, data, next);
            return response;
        } catch (error) {
            error.from = "UsersRepository";
            return next(error);
        }
    };

    updateUserRole = async (id, role, next) => {

        try {
            const user = await this.model.updateUserRole(id, role, next);
            return user;
        } catch (error) {
            error.from = "UsersRepository";
            return next(error);
        }
    };

    updateUserCart = async (user, cart, next) => {

        try {
            const response = await this.model.updateUserCart(user, cart, next);
            return response;
        } catch (error) {
            error.from = "UsersRepository";
            return next(error);
        }
    };

    updateUserTicket = async (user, ticket, next) => {

        try {
            const response = await this.model.updateUserTicket(user, ticket, next);
            return response;
        } catch (error) {
            error.from = "UsersRepository";
            return next(error);
        }
    };

    deleteUser = async (id, next) => {
        
        try {
            const response = await this.model.deleteUser(id, next);
            return response;
        } catch (error) {
            error.from = "UsersRepository";
            return next(error);
        }
    };

    deleteTicket = async (id, ticket, next) => {
        
        try {
            const deleteTicket = await this.model.deleteTicket(id, ticket, next);
            return deleteTicket;
        } catch (error) {
            error.from = "UsersRepository";
            return next(error);
        }
    };

}