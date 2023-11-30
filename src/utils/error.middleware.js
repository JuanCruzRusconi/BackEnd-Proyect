import DictionaryErrors from "./dictionaryError.js";

const ErrorMiddleware = (error, req, res, next) => {

    //res.send({error});
    console.log(error.cause)

    switch (error.code) {

        case DictionaryErrors.USER_INPUT_ERROR:
            res.send({ error: true, message: error.name });
            break;

        case DictionaryErrors.ROUTING_ERROR:
            res.send({ error: true, message: error.name });
            break;


        case DictionaryErrors.CONTROLLER_ERROR:
            res.send({ error: true, message: error.name });
            break;

        case DictionaryErrors.SERVICE_ERROR:
            res.send({ error: true, message: error.name });
            break;


        case DictionaryErrors.DATABASE_ERROR:
            res.send({ error: true, message: error.name });
            break;
        
        default:
            res.send({error: true, message: "Error no encontrado en el diccionario."});
            break;
    }
}

export default ErrorMiddleware;