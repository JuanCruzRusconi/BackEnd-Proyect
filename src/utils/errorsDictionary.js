const ErrorsDictionary = {

    NOT_FOUND_ONE: { status: 404, message: "Not found document."},
    NOT_FOUND: { status: 404, message: "Not found docuements."},
    USER_INPUT_ERROR: {status: 400, message: "Incomplete values."},
    AUTH_ERROR: { status: 401, message: "Invalid credentials."},
    AUTH_DATA_ERROR: { status: 401, message: "Credentials are already in use."},
    FORBIDDEN_ERROR: { status: 403, message: "Not authorized."},
    DOCUMENT_ERROR: { status: 500, message: "Cannot create document."},
    DOCUMENT_EMPTY: { status: 404, message: "Document is empty."}, 
    NOT_LOGGED: { status: 404, message: "Must be logged to do this operation."},
    PRODUCT_INPUT_ERROR: {status: 400, message: "Invalid item."},
    COOKIE_NOT_FOUND: {status: 400, message: "Cookie not found."},

}

export default ErrorsDictionary;