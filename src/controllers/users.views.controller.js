import * as ProductsServices from "../services/products.services.js"
import * as UsersServices from "../services/users.services.js";
import { generateToken } from "../utils/jwt.js";

// ------- Autenticacion sin estrategia de terceros ------- //

export const POSTFirstLogin = async (req, res) => {

    try {
    const { username, password } = req.body;
    const user = await UsersServices.ValidateUser(username, password);
    if(!user) return res.status(401).send({error: true, msg: "Credenciales inexistentes"});
    delete user.password;
    delete user.salt;
    req.session.user = user;
    res.redirect("/user/profile");
    } catch {
        res.status(502).send({error : true});
    }
};

export const POSTFirstRegister =  async (req, res) => {

    try {
    const { name, surname, username, password } = req.body;
    //const body = req.body;
    const user = await UsersServices.CreateUser({
        name: name,
        surname: surname,
        username: username,
        password: password,
        role: username === "admincoder@coder.com" ? "admin" : "user"});
    res.redirect("/user/profile");
    } catch {
        res.status(502).send({error : true});
    }
};

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
        console.log("Inicio de sesion:", req.user)
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
        });
    } catch (e) {
        console.log(e);
    }
};

// ------- Passport + JWT ------- //

export const POSTLoginJWT = async (req,res) => {
    
    try {
        const user = await UsersServices.ValidateUser(req.body.username, req.body.password);
        if(!user) return res.send({ error: true, msg: "Credenciales invalidas" });

        const token = generateToken({sub: user._id, user: {email: user.username}});

        res.cookie("accessToken", token, {
        maxAge: (24*60*60)*1000,
        httpOnly: true
        });
        //res.send({ error: false, accessToken: token, user: user });
        res.redirect("/user/profile")
        
    } catch (e) {
        console.log(e);
    }
};

export const POSTRegisterJWT = async (req,res) => {
    
    try {
        const userExists = await UsersServices.GetUserByUsername(username);
        if (userExists) return done(null, false);

        const { name, surname, username, password } = req.body;

        const user = await UsersServices.CreateUser({
            name: name,
            surname: surname,
            username: username,
            password: password,
            role: username === "admincoder@coder.com" ? "admin" : "user"
        });

        const token = generateToken({sub: user._id, user: {email: user.username}});

        res.cookie("accessToken", token, {
        maxAge: (24*60*60)*1000,
        httpOnly: true
        });
        //res.send({ error: false, accessToken: token, user: user });
        res.redirect("/user/profile")
        
    } catch (e) {
        console.log(e);
    }
};

export const GETLogoutJWT = async (req,res) => {
    
    try {
        res.cookie("accessToken", "", { expires: new Date(0), httpOnly: true });
        //res.send({ error: false, message: 'Cierre de sesión exitoso' });
        res.redirect("/user/login");
    } catch (e) {
        console.log(e);
    }
};