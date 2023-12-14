import ProductsServices from "../services/products.services.js";
import CustomError from "../utils/customError.js";
import ErrorsDictionary from "../utils/errorsDictionary.js";


export default class ProductsViewsControllers {

    constructor () {
        this.service = new ProductsServices();
    };

    GETProducts = async (req, res, next) => {
   
        try {
            const isAdmin = req.query.admin;
            const products = await this.service.GetProducts(next);
            if(!products) return CustomError.createError(ErrorsDictionary.NOT_FOUND);
            res.render("home", {
                products: products.map(product => product),
                isAdmin: true
            });
        } catch (error) {
            error.from = "ProductsViewsControllers";
            return next(error);
        }
    };
    
    GETProductById = async (req, res, next) => {
       
        try {  
            const { pid } = req.params;
            const isAdmin = req.query.admin; 
            const product = await this.service.GetProductById(pid, next); 
            if(!product) return CustomError.createError(ErrorsDictionary.NOT_FOUND_ONE)
            res.render("home", { product: product.toObject(), isAdmin: true });
        } catch (error) {
            error.from = "ProductsViewsControllers";
            return next(error);
        }
    };
    
    GETRealTimeProducts = async (req, res, next) => {
       
        try {  
            const products = await this.service.GetProducts(next); 
            if(!products) return CustomError.createError(ErrorsDictionary.NOT_FOUND);
            res.render("realTimeProducts", { productos: products.map(product => product.toJSON()), isAdmin: true });
            //socket.emit("listaProductos", productos);
        } catch (error) {
            error.from = "ProductsViewsControllers";
            return next(error);
        }
    };

}


