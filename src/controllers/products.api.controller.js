import ProductsDTOReturn from "../dto/products.dto.js";
import productsModel from "../schemas/products.schema.js";
import * as ProductsServices from "../services/products.services.js"
import CustomError from "../utils/customError.js";
import DictionaryErrors from "../utils/dictionaryError.js";
import { generateNewProductError } from "../utils/generateNewProductError.js";

export const GETProducts = async (req, res) => {
   
    try {  
    const { limit = 10, page = 1, sort = 1, ...query } = req.query;
    const prods = await ProductsServices.GetProducts();
    const products = await productsModel.paginate(query, {
        limit: limit,
        lean: true,
        page: page, 
        sort: {price: +sort}
    });
    res.send(prods);
    } catch {
        res.status(502).send({error : true, msg: "Not autorized"})
    }
};

export const GETProductById = async (req, res) => {
    
    try {
    const { pid } = req.params
    const product = await ProductsServices.GetProductById(pid);
    res.send(product);
    } catch {
        res.status(502).send({error : true})
    }
};

export const POSTProduct = async (req, res) => {

    //try {
        const body = req.body;
        if(!body.title || !body.price || !body.sotck) {
            CustomError.createError({
                message: "No se puede crear el producto.",
                cause: generateNewProductError({ body }),
                name: "New product error",
                code: DictionaryErrors.USER_INPUT_ERROR,
            }); 
        };
        const addNewProduct = await ProductsServices.PostProduct(body);
        res.send(addNewProduct);
    //} catch (e) {
        //res.status(502).send({error : true, msg: e.message})
    //}
};

export const PUTProductById = async (req, res) => {
    
    try {
    const { pid } = req.params;
    const product = req.body; 
    await ProductsServices.PutProduct(pid, product);
    const updateProd = await ProductsServices.GetProductById(pid);
    res.send(updateProd);
    } catch {
        res.status(502).send({error : true})
    }
};

export const DELETEProductById = async (req, res) => {
    
    try {
    const { pid } = req.params;
    await ProductsServices.DeleteProduct(pid);
    res.send({error: false, delete: true});
    } catch {
        res.status(502).send({error : true})
    }
};
