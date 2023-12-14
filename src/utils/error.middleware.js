import ErrorsDictionary from "./errorsDictionary.js";

const ErrorMiddleware = (error, req, res, next) => {

    //res.send({error});
    console.log(error.cause)

    switch (error.code) {

        case ErrorsDictionary.USER_INPUT_ERROR:
            res.send({ error: true, message: error.name });
            break;

        case ErrorsDictionary.ROUTING_ERROR:
            res.send({ error: true, message: error.name });
            break;


        case ErrorsDictionary.CONTROLLER_ERROR:
            res.send({ error: true, message: error.name });
            break;

        case ErrorsDictionary.SERVICE_ERROR:
            res.send({ error: true, message: error.name });
            break;


        case ErrorsDictionary.DATABASE_ERROR:
            res.send({ error: true, message: error.name });
            break;
        
        default:
            res.send({error: true, message: "Error no encontrado en el diccionario."});
            break;
    }
}

export default ErrorMiddleware;