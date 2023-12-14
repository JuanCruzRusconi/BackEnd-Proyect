import productsModel from "../schemas/products.schema.js";
import ProductsServices from "../services/products.services.js";
import CustomError from "../utils/customError.js";
import ErrorsDictionary from "../utils/errorsDictionary.js";


export default class ProductsApiControllers {

    constructor () {
        this.service = new ProductsServices();
    };

    POSTProduct = async (req, res, next) => {
    
        try {
            const body = req.body;
            if(!body.title || !body.price || !body.code || !body.stock) {
                CustomError.createError(ErrorsDictionary.USER_INPUT_ERROR); 
            };
            const addNewProduct = await this.service.CreateProduct(body, next);
            res.status(201).send({ status: "success", message: "done", payload: addNewProduct });
        } catch (error) {
            error.from = "ProductsApiControllers";
            return next(error);
        }
    };

    GETProducts = async (req, res, next) => {
   
        try {  
            const { limit = 10, page = 1, sort = 1, ...query } = req.query;
            const prods = await this.service.GetProducts(next);
            if(!prods) return CustomError.createError(ErrorsDictionary.NOT_FOUND);
            const products = await productsModel.paginate(query, {
                limit: limit,
                lean: true,
                page: page, 
                sort: {price: +sort}
            });
            res.status(200).send({ status: "success", response: prods });
        } catch (error) {
            error.from = "ProductsApiControllers";
            return next(error);
        }
    };
    
    GETProductById = async (req, res, next) => {
        
        try {
            const { pid } = req.params;
            const product = await this.service.GetProductById(pid, next);
            if(!product) return CustomError.createError(ErrorsDictionary.NOT_FOUND_ONE);
            res.status(200).send({ status: "success", response: product });
        } catch (error) {
            error.from = "ProductsApiControllers";
            return next(error);
        }
    };
    
    PUTProductById = async (req, res, next) => {
        
        try {
            const { pid } = req.params;
            const product = req.body; 
            if(!product.body) return CustomError.createError(ErrorsDictionary.USER_INPUT_ERROR);
            await this.service.UpdateProduct(pid, product, next);
            const updateProd = await this.service.GetProductById(pid, next);
            res.status(200).send({ status: "success", response: updateProd });
        } catch (error) {
            error.from = "ProductsApiControllers";
            return next(error);
        }
    };
    
    DELETEProductById = async (req, res, next) => {
        
        try {
            const { pid } = req.params;
            if(!await this.service.GetProductById(pid, next)) return CustomError.createError(ErrorsDictionary.NOT_FOUND_ONE);
            const product = await this.service.DeleteProduct(pid, next);
            res.status(200).send({ status: "success", delete: true });
        } catch (error) {
            error.from = "ProductsApiControllers";
            return next(error);
        }
    };
    
}
