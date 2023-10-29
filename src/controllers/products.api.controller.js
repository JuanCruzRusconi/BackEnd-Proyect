import productsModel from "../schemas/products.schema.js";
import * as ProductsServices from "../services/products.services.js"

export const GETProducts = async (req, res) => {
   
    try {  
    const { limit = 10, page = 1, sort = 1, ...query } = req.query;
    const products = await productsModel.paginate(query, {
        limit: limit,
        lean: true,
        page: page, 
        sort: {price: +sort}
    });
    res.send(products);
    } catch {
        res.status(502).send({error : true})
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

    try {
        const body = req.body;
        const addNewProduct = await ProductsServices.PostProduct(body);
        res.send(addNewProduct);
    } catch {
        res.status(502).send({error : true})
    }
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