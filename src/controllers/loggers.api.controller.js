import ProductsServices from "../services/products.services.js";

const ProductService = new ProductsServices();


export const POSTProduct = async (req, res, next) => {
    
    try {
        const body = req.body;
        if(!body || Object.keys(body).length === 0) throw new Error("Se necesita llenar los campos.")
        const createProd = await ProductService.CreateProduct(body, next);
        return res.status(200).json({ error: false, message: "Producto creado correctaemnte." });
    } catch (error) {
        error.from = "LoggersServices";
        return next(error);
    }

};

export const GETProducts = async (req, res, next) => {

    try {
        const carts = await ProductService.GetProducts(next);
        if(!carts) throw new Error("No se pueden mostrar los products.")
        res.status(200).json({ status: "success", payload: carts });
    } catch (error) {
        error.from = "LoggersServices";
        return next(error);
    }
};

export const GETProductById = async (req, res, next) => {

    try {
        const { pid } = req.params;
        if(!await ProductService.GetProductById(pid, next)) throw new Error("ID incorrecto");
        const carts = await ProductService.GetProductById(pid, next);
        res.send(carts);
    } catch (error) {
        error.from = "LoggersServices";
        return next(error);
    }
};

export const PUTProductById = async (req, res, next) => {
    
    try {
        const { pid } = req.params;
        const body = req.body;
        if(!await ProductService.GetProductById(pid, next)) throw new Error("ID incorrecto.")
        if(!body || Object.keys(body).length === 0) throw new Error("Se necesita llenar los campos para actualizar el producto.")
        await ProductService.UpdateProduct(pid, body, next);
        res.send({erro: false, msg: "Producto actualizado"});
    } catch (error) {
        error.from = "LoggersServices";
        return next(error);
    }
};


export const DELETEProduct = async (req, res, next) => {

    try {
        const { pid } = req.params;
        if(!await ProductService.GetProductById(pid, next)) throw new Error("ID incorrecto.")
        const cart = await ProductService.DeleteProduct(pid, next);
        res.send({error: false, deleted: true});
    } catch (error) {
        error.from = "LoggersServices";
        return next(error);
    }
};
