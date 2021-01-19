"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerError extends Error {
    constructor(addedStatusCode, addedType, addedMessage) {
        super();
        this.addedStatusCode = addedStatusCode;
        this.addedMessage = addedMessage;
        this.addedType = addedType;
    }
}
exports.default = ServerError;
