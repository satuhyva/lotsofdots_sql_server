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
Object.defineProperty(exports, "__esModule", { value: true });
const createNewVoting = (server, question, showNames, allowedCount, options) => __awaiter(void 0, void 0, void 0, function* () {
    let newVoting = {};
    if (question !== null) {
        newVoting = Object.assign(Object.assign({}, newVoting), { question: question });
    }
    if (showNames !== null) {
        newVoting = Object.assign(Object.assign({}, newVoting), { showNames: showNames });
    }
    if (allowedCount !== null) {
        newVoting = Object.assign(Object.assign({}, newVoting), { allowedCount: allowedCount });
    }
    if (options !== null) {
        newVoting = Object.assign(Object.assign({}, newVoting), { options: options });
    }
    const response = yield server
        .post('/votings')
        .send(newVoting);
    return response;
});
const getVoting = (server, votingNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield server
        .get(`/votings/${votingNumber}`)
        .send();
    return response;
});
const addAnswers = (server, name, answers) => __awaiter(void 0, void 0, void 0, function* () {
    let answersToSend = {};
    if (name !== null) {
        answersToSend = Object.assign(Object.assign({}, answersToSend), { name: name });
    }
    if (answers !== null) {
        answersToSend = Object.assign(Object.assign({}, answersToSend), { answers: answers });
    }
    const response = yield server
        .post('/answers')
        .send(answersToSend);
    return response;
});
exports.default = {
    createNewVoting,
    getVoting,
    addAnswers
};
