import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    thumbnail: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        require: true
    },
    category: {
        type: String,
        require: true
    }
});

const productsModel = mongoose.model("products", productsSchema);

export default productsModel;


//const {title, description, price, thumbnail, code, stock} = product