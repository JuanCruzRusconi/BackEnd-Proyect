export default class CustomError {

    static createError({message, cause, name, code}) {

        const error = new Error(message, {cause});
        error.name = name;
        error.code = code;

        throw error;
    }
}