import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        default: "@gmail.com",
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    //salt: {
        //type: String, -- crypto
    //},
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"  
    }
});

const userModel = mongoose.model("users", usersSchema);

export default userModel;