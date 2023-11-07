import * as ProductsServices from "../services/products.services.js"

export const GETProducts = async (req, res) => {
   
    try {
        const isAdmin = req.query.admin;
        const productos = await ProductsServices.GetProducts();
        res.render("home", {
            products: productos.map(producto => producto.toJSON()),
            isAdmin: true
        });
    } catch {
        res.status(502).send({ error: true });
    }
};

export const GETProductById = async (req, res) => {
   
    try {  
    const { pid } = req.params;
    const isAdmin = req.query.admin; 
    const product = await ProductsServices.GetProductById(pid); 
    res.render("home", { product: product.toObject(), isAdmin: true });
    } catch {
        res.status(502).send({error : true})
    }
};

export const GETRealTimeProducts = async (req, res) => {
   
    try {  
    const productos = await ProductsServices.GetProducts(); 
    res.render("realTimeProducts", { productos: productos.map(product => product.toJSON()), isAdmin: true });
    //socket.emit("listaProductos", productos);
    } catch {
        res.status(502).send({error : true})
    }
};