"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServerError_1 = __importDefault(require("./ServerError"));
const unknownEndpoint = (request, _response, next) => {
    const message = `UNKNOWN ENDPOINT! Caused by a ${request.method} request to ${request.url}.`;
    const serverError = new ServerError_1.default(404, 'Unknown endpoint', message);
    return next(serverError);
};
exports.default = unknownEndpoint;
