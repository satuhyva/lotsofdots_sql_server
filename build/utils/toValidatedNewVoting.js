"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServerError_1 = __importDefault(require("./ServerError"));
const toValidatedNewVoting = (requestBody) => {
    const body = requestBody;
    return {
        question: parseQuestion(body.question),
        showNames: parseShowNames(body.showNames),
        allowedCount: parseAllowedCount(body.allowedCount),
        options: parseOptions(body.options)
    };
};
const parseQuestion = (question) => {
    if (!question || !isString(question)) {
        throw new ServerError_1.default(400, 'InputError', 'Voting parameter "question" is missing or is not a string value.');
    }
    return question;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseShowNames = (showNames) => {
    if (showNames === undefined || showNames === null || !isBoolean(showNames)) {
        throw new ServerError_1.default(400, 'InputError', 'Voting parameter "show names" is missing or is not a boolean value.');
    }
    return showNames;
};
const isBoolean = (value) => {
    return typeof value === 'boolean' || value instanceof Boolean;
};
const parseAllowedCount = (allowedCount) => {
    if (!allowedCount || !isNumber(allowedCount)) {
        throw new ServerError_1.default(400, 'InputError', 'Voting parameter "allowed count" is missing or is not a number value.');
    }
    return allowedCount;
};
const isNumber = (number) => {
    return typeof number === 'number' || number instanceof Number;
};
const parseOptions = (options) => {
    if (!options || !isArrayOfStrings(options)) {
        throw new ServerError_1.default(400, 'InputError', 'Voting parameter "options" is missing or is not a string array value.');
    }
    return options;
};
const isArrayOfStrings = (options) => {
    return Array.isArray(options) && options.length > 0 && options.every(option => isString(option));
};
exports.default = toValidatedNewVoting;
