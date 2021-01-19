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
const answersService_1 = __importDefault(require("../services/answersService"));
const toValidatedAnswers_1 = __importDefault(require("../../utils/toValidatedAnswers"));
const answersRouter = express_1.Router();
// eslint-disable-next-line @typescript-eslint/no-misused-promises
answersRouter.post('/', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let votingAnswers;
    try {
        votingAnswers = toValidatedAnswers_1.default(request.body);
    }
    catch (error) {
        next(error);
        return;
    }
    try {
        yield answersService_1.default.addAnswersToVoting(votingAnswers);
        response.status(200).json('Answers successfully added!');
    }
    catch (error) {
        const serverError = error;
        serverError.addedMessage = 'Error in adding answers to a voting.';
        serverError.addedStatusCode = 500;
        serverError.addedType = 'InternalError';
        next(serverError);
    }
}));
exports.default = answersRouter;
