"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, _request, response, next) => {
    const errorIsOfTypeServerError = checkIfErrorIsOfTypeServerError(error);
    if (errorIsOfTypeServerError) {
        const errorAsServerError = error;
        return response.status(errorAsServerError.addedStatusCode).json(errorAsServerError.addedMessage);
    }
    next(error);
    return;
};
const checkIfErrorIsOfTypeServerError = (error) => {
    if (error.addedMessage && error.addedStatusCode && error.addedType) {
        return true;
    }
    return false;
};
exports.default = errorHandler;
