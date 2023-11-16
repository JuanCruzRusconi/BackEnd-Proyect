
const ensureAuthenticated = (req, res, next) => {
   
    try {
        if (!req.isAuthenticated()) throw new Error("Usuario no autenticado");
        return next(); // El usuario está autenticado, permite el acceso a la ruta
    } catch (e) {
        res.status(401).send({error: true, msg: e.message});
    }
};  

export default ensureAuthenticated;