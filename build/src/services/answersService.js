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
const databaseWithConfigurations_1 = __importDefault(require("../database/databaseWithConfigurations"));
const addAnswersToVoting = (votingAnswers) => __awaiter(void 0, void 0, void 0, function* () {
    yield databaseWithConfigurations_1.default.tx((transaction) => __awaiter(void 0, void 0, void 0, function* () {
        const nameArray = getNameArray(votingAnswers.name, votingAnswers.answers.length);
        const addAnswers = yield databaseWithConfigurations_1.default.none('INSERT INTO answer(name, option_id) SELECT * FROM unnest($1, $2)', [nameArray, votingAnswers.answers]);
        return transaction.batch([addAnswers]);
    }));
    return;
});
const getNameArray = (name, count) => {
    const array = new Array(count).fill(name);
    return array;
};
exports.default = {
    addAnswersToVoting,
};
