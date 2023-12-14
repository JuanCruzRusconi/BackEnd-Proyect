export default class CustomError {

    static createError({ status, message, from }) {

        const error = new Error(message);
        
        error.status = status;
        error.message = message;
        error.from = from;

        throw error;
    };
}