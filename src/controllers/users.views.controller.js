import * as ProductsServices from "../services/products.services.js"

export const GETLogin = async (req,res) => {
    
    try {
        res.render("login");
    } catch (e) {
        console.log(e);
    }
};

export const GETRegister = async (req,res) => {
    
    try {
        res.render("register");
    } catch (e) {
        console.log(e);
    }
};
 
export const GETProfile = async (req,res) => {
    
    try {
        const { name, surname, username } = req.user;
        console.log("Inicio de sesion:")
        console.log(req.user);
        res.render("profile", req.user); 
    } catch (e) {
        console.log(e);
    }
};

export const GETProfileProducts = async (req,res) => {
    
    try {
        const { nombre, apellido, username } = req.user;
        const isAdmin = req.query.admin;
        const productos = await ProductsServices.GetProducts();
        res.render("home", { products: productos.map(producto => producto.toJSON()), isAdmin: true }); 
    } catch (e) {
        console.log(e);
    }
};


export const GETLogout = async (req,res) => {
    
    try {
        req.session.destroy((error) => {
            res.redirect("/user/login");
        })
    } catch (e) {
        console.log(e);
    }
};