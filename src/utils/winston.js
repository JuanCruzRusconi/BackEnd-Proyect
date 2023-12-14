import logger from "../config/loggers/factory.loggers.js";

export default (req, res, next) => {

    req.logger = logger;

    let statusCode =  200;

    req.logger.HTTP(`${req.method} ${req.url}  -  ${new Date().toLocaleTimeString()}`);

    req.logger.INFO(`Status >= 200: ${req.method} ${req.url}  -  ${new Date().toLocaleTimeString()}`) 

    return next();

}