"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServerError_1 = __importDefault(require("./ServerError"));
const toValidatedAnswers = (requestBody) => {
    const body = requestBody;
    return {
        name: parseName(body.name),
        answers: parseAnswers(body.answers)
    };
};
const parseName = (name) => {
    if (name === undefined)
        return null;
    if (!isString(name)) {
        throw new ServerError_1.default(400, 'InputError', 'Voter name is not a string value.');
    }
    return name;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseAnswers = (answers) => {
    if (!answers || !isArrayOfNumbers(answers)) {
        throw new ServerError_1.default(400, 'InputError', 'Voting answers is missing or is not a number array value.');
    }
    return answers;
};
const isArrayOfNumbers = (array) => {
    return Array.isArray(array) && array.every(item => isNumber(item)) && array.length > 0;
};
const isNumber = (number) => {
    return typeof number === 'number' || number instanceof Number;
};
exports.default = toValidatedAnswers;
