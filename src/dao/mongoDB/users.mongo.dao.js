import crypto from "crypto";
import { dirname } from "path";
import { fileURLToPath } from "url";
import userModel from "../../schemas/users.schema.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default class UsersMONGO {

    constructor () {}

    createUser = async (user, next) => {
        
        try {
            const newUser = await userModel.create(user);
            return newUser;
        } catch (error) {
            error.from = "UsersMongo";
            return next(error);
        }
    };

    getUsers = async (next) => {

        try {
            const users = await userModel.find();
            return users;
        } catch (error) {
            error.from = "UsersMongo";
            return next(error);
        }
    };

    getUserById = async (id, next) => {

        try {
            const user = await userModel.findById(id).populate("cart", "tickets");
            return user;
        } catch (error) {
            error.from = "UsersMongo";
            return next(error);
        }
    };

    getUserByUsername = async (username, next) => {

        try {
            const user = await userModel.findOne({ username });
            return user;
        } catch (error) {
            error.from = "UsersMongo";
            return next(error);
        }
    };

    updateUserProfile = async (username, data, next) => {

        try {
            const user = await userModel.updateOneOne({ username: username }, { $set: data});
            return user;
        } catch (error) {
            error.from = "UsersMongo";
            return next(error);
        }
    };

    updateUserRole = async (id, role, next) => {

        try {
            const userRole = await userModel.updateOne({ _id: id }, { $set: { role: role } });
            return userRole;
        } catch (error) {
            error.from = "UsersMongo";
            return next(error);
        }
    };

    updateUserCart = async (user, cart, next) => {

        try {
            const userUpdated = await userModel.findOneAndUpdate({ _id: user._id }, { $set: { cart: cart._id } });
            return userUpdated;
        } catch (error) {
            error.from = "UsersMongo";
            return next(error);
        }
    };
    
    updateUserTicket = async (user, ticket, next) => {

        try {
            const userUpdated = await userModel.findOneAndUpdate({ _id: user._id }, { $push: { tickets: ticket._id } });
            return userUpdated;
        } catch (error) {
            error.from = "UsersMongo";
            return next(error);
        }
    };

    deleteUser = async (id, next) => {
        
        try {
            const deleteUser = await userModel.deleteOne({_id: id});
            return deleteUser;
        } catch (error) {
            error.from = "UsersMongo";
            return next(error);
        }
    };

    deleteTicketUser = async (id, ticket, next) => {
        
        try {
            const deleteTicket = await userModel.updateOne({_id: id}, { $pull: { tickets: ticket }});
            return deleteTicket;
        } catch (error) {
            error.from = "UsersMongo";
            return next(error);
        }
    };
}

