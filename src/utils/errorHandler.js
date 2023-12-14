import logger from "../config/loggers/factory.loggers.js";


export default (error, req, res, next) => {

    req.logger = logger;
    let statusCode = error.statusCode || 500;
    
    req.logger.FATAL(`${req.method} ${req.url}  -  ${error.message}  -  ${new Date().toLocaleTimeString()}`);
    
    switch (true) {
        
        case statusCode >= 500:
            req.logger.ERROR(`Server error: ${req.method} ${req.url} - ${error.message}`);
            break;
        
            default:
            req.logger.WARN(`Bad request: ${req.method} ${req.url} - ${error.message}`);
            break;
    };

    return res.status(statusCode).json({
        error: true,
        success: false,
        status: statusCode, 
        message: error.message,  
        code: error.code,
        from: `${req.method} ${req.url} - ${error.from}`,
        response: `ErrorHandler`
    });
};