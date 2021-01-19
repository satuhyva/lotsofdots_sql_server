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
exports.getRandomNumberWith6Digits = exports.getUniqueRandomNumberString = void 0;
const databaseWithConfigurations_1 = __importDefault(require("../database/databaseWithConfigurations"));
const getVoting = (votingNumber) => __awaiter(void 0, void 0, void 0, function* () {
    let fetchedVoting = null;
    yield databaseWithConfigurations_1.default.tx((transaction) => __awaiter(void 0, void 0, void 0, function* () {
        fetchedVoting = yield databaseWithConfigurations_1.default.one(`SELECT question, voting_number, show_names, allowed_count, created, JSON_AGG(JSON_BUILD_OBJECT('id', NESTED.option_id, 'option_text', option_text,'option_voters', NESTED.votes)) AS option_votes FROM 
                (SELECT question, voting_number, show_names, allowed_count, created, option_text, option.id as option_id, ARRAY_AGG(name) as votes FROM voting 
                INNER JOIN option ON option.voting_id = voting.id AND option.deleted = $1 
                LEFT JOIN answer ON answer.option_id = option.id AND answer.deleted = $2
                WHERE voting_number = $3 AND voting.deleted = $4 
                GROUP BY question, voting_number, show_names, allowed_count, created, option_text, option.id) AS NESTED 
            GROUP BY NESTED.question, NESTED.voting_number, NESTED.show_names, NESTED.allowed_count, NESTED.created 
            `, [false, false, votingNumber, false]);
        return transaction.batch([fetchedVoting]);
    }));
    return fetchedVoting;
});
const createNewVoting = (newVoting) => __awaiter(void 0, void 0, void 0, function* () {
    const newVotingNumber = yield exports.getUniqueRandomNumberString();
    const dateCreated = new Date();
    yield databaseWithConfigurations_1.default.tx((transaction) => __awaiter(void 0, void 0, void 0, function* () {
        const createdNewVoting = yield databaseWithConfigurations_1.default.one('INSERT INTO voting(question, created, voting_number, show_names, allowed_count) VALUES($1, $2, $3, $4, $5) RETURNING id', [newVoting.question, dateCreated, newVotingNumber, newVoting.showNames, newVoting.allowedCount]);
        const votingIdArray = getVotingIdArray(createdNewVoting.id, newVoting.options.length);
        const addOptions = yield databaseWithConfigurations_1.default.none('INSERT INTO option(voting_id, option_text) SELECT * FROM unnest($1, $2)', [votingIdArray, newVoting.options]);
        return transaction.batch([createdNewVoting, addOptions]);
    }));
    return newVotingNumber;
});
const getUniqueRandomNumberString = () => __awaiter(void 0, void 0, void 0, function* () {
    let randomNumber = null;
    let continueLooking = true;
    while (continueLooking) {
        randomNumber = exports.getRandomNumberWith6Digits();
        const idOfVotingWithNumber = yield databaseWithConfigurations_1.default.oneOrNone('SELECT id FROM voting WHERE voting_number = $1 AND deleted = $2', [randomNumber, false]);
        if (!idOfVotingWithNumber) {
            continueLooking = false;
        }
    }
    return randomNumber;
});
exports.getUniqueRandomNumberString = getUniqueRandomNumberString;
const getRandomNumberWith6Digits = () => {
    return Math.random().toString().substring(3, 9);
};
exports.getRandomNumberWith6Digits = getRandomNumberWith6Digits;
const getVotingIdArray = (votingId, count) => {
    const array = new Array(count).fill(votingId);
    return array;
};
exports.default = {
    getVoting,
    createNewVoting,
};
