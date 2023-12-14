import mongoose from "mongoose";

let collection = "productsMocks";

const productsMocksSchema = new mongoose.Schema({
    
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    stock: { 
        type: Number, 
        required: true 
    },
    url_photo: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
  },
  { timestamps: true }
);

const productsMocksModel = mongoose.model(collection, productsMocksSchema);

export default productsMocksModel;