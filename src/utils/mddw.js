// ------- Middlewars autenticacion ------- //

export const protectedView = (req, res, next) => {
    
    if(!req.user) return res.redirect("/user/login");
    next();
};

export const isLogged = (req, res, next) => {

    if(req.user) return res.redirect("/user/profile");
    next();
};

// ------- Passport ------- //

export const verifyAuthentication = (req, res, next) => {
   
    try {
        if (!req.isAuthenticated()) throw new Error("Usuario no autenticado");
        res.redirect("/user/login");
        return next(); // El usuario está autenticado, permite el acceso a la ruta
    } catch (e) {
        res.status(401).send({error: true, msg: e.message});
    }
};  

// ------- Passport + JWT ------- //

export const protectedViewJWT = (req, res, next) => {
    
    if(!req.user) return res.redirect("/user/login");
    next();
};

export const verifyRole = (role) => (req, res, next) => {

    try {
        if( req.user && req.user.role !== role) throw new Error("No posess los permisos.")
        return next();
    } catch (e) {
        res.status(403).send({error: true, msg: e.message})
    }
}