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
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        enum: ["admin", "user", "premium"],
        default: "user"  
    },
    tickets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tickets"
        }
    ]
});

usersSchema.pre("find", function () {
    this.populate("cart");
});

const userModel = mongoose.model("users", usersSchema);

export default userModel;