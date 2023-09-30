import mongoose, { mongo } from "mongoose";

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
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        type: [{
            cart: {
                type: mongoose.Types.ObjectId,
                ref: "carts",
            }
        }],
        require: true,
        default: []
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

usersSchema.pre("find", function () {
    this.populate("carts.cart");
});

const userModel = mongoose.model("users", usersSchema);

export default userModel;