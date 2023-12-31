import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products" 
                }, 
                quantity: {
                    type: Number,
                    default: 1,
                },
            }
        ],
        default: []
    }
});

cartsSchema.pre("find", function () {
    this.populate("products.product");
});

const cartsModel = mongoose.model("carts", cartsSchema);

export default cartsModel;

/*
{
    "id":1,
    "products":[
        {"id":1,"quantity":1}
    ]
}
*/