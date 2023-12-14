export default (req, res, next) =>  {

    try {
        return res.status(404).json({ 
            error: true,
            method: req.method,
            url: req.url,
            message: "Ruta no encontrada."
         });
    } catch (error) {
        next(error);
    }
};