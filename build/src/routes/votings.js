"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const votingsService_1 = __importDefault(require("../services/votingsService"));
const toValidatedNewVoting_1 = __importDefault(require("../../utils/toValidatedNewVoting"));
const toValidatedVotingNumber_1 = __importDefault(require("../../utils/toValidatedVotingNumber"));
const votingsRouter = express_1.Router();
// eslint-disable-next-line @typescript-eslint/no-misused-promises
votingsRouter.post('/', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let newVoting;
    try {
        newVoting = toValidatedNewVoting_1.default(request.body);
    }
    catch (error) {
        next(error);
        return;
    }
    try {
        const createdNewVotingNumber = yield votingsService_1.default.createNewVoting(newVoting);
        response.json(createdNewVotingNumber);
    }
    catch (error) {
        const serverError = error;
        serverError.addedMessage = 'Error in creating new voting.';
        serverError.addedStatusCode = 500;
        serverError.addedType = 'InternalError';
        next(serverError);
    }
}));
// eslint-disable-next-line @typescript-eslint/no-misused-promises
votingsRouter.get('/:votingNumber', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let votingNumber;
    try {
        votingNumber = toValidatedVotingNumber_1.default(request.params);
    }
    catch (error) {
        next(error);
        return;
    }
    try {
        const voting = yield votingsService_1.default.getVoting(votingNumber);
        response.json(voting);
    }
    catch (error) {
        console.log('error', error);
        const serverError = error;
        serverError.addedMessage = 'Error in getting the voting.';
        serverError.addedStatusCode = 500;
        serverError.addedType = 'InternalError';
        next(serverError);
    }
}));
exports.default = votingsRouter;
