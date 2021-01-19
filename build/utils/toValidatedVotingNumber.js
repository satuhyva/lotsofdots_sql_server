"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServerError_1 = __importDefault(require("./ServerError"));
const toValidatedVotingNumber = (requestParams) => {
    const params = requestParams;
    return parseVotingNumber(params.votingNumber);
};
const parseVotingNumber = (votingNumber) => {
    if (!votingNumber || !isString(votingNumber) || !isOfCorrectLength(votingNumber)) {
        throw new ServerError_1.default(400, 'InputError', 'Voting number is not a string value or is not of correct length.');
    }
    return votingNumber;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isOfCorrectLength = (text) => {
    return text.length === 6;
};
exports.default = toValidatedVotingNumber;
