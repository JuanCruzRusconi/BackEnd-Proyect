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
    /*cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    /*
    cart: {
        type: [
            {
                carts: {
                    //_id
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "carts",
                }
            }
        ],
        required: true,
        default: []
    },*/
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
    this.populate("cart.carts");
});
/*
usersSchema.pre("save", function (next) {
    this.cart = CartServices;
    next()
});*/

const userModel = mongoose.model("users", usersSchema);

export default userModel;