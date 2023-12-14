import args from "../args.js";
import loggerProd from "../loggers/config.prod.logger.js";
import loggerDev from "../loggers/config.dev.logger.js";

let logger = null;

switch (args.mode) {

    case "dev":
        logger = loggerDev;
        console.log("Logger mode dev");
        break;

    case "test": 
        logger = loggerDev;
        console.log("Logger mode dev");
        break;
    
    default: // "prod"
        logger = loggerProd;
        console.log("Logger mode prod");
        break;
};

export default logger;