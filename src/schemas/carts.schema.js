import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({

    products: {
        type: Array
    }
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