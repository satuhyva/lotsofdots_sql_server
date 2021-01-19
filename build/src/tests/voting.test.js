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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const server = supertest_1.default(app_1.default);
const votingsService_1 = require("../services/votingsService");
const testHelperFunctions_1 = __importDefault(require("./testHelperFunctions"));
describe('CREATE NEW VOTING', () => {
    test('A random number with 6 digits can be created.', () => {
        const randomNumber = votingsService_1.getRandomNumberWith6Digits();
        expect(typeof randomNumber).toBe('string');
        expect(typeof Number(randomNumber)).toBe('number');
        const numberRegex = /^[0-9]{6}/;
        expect(numberRegex.test(randomNumber)).toBe(true);
    });
    test('A new voting can be created and voting number returned if proper input data is provided.', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']);
        expect(response.status).toBe(200);
        const newVotingNumber = String(response.body);
        const numberRegex = /^[0-9]{6}/;
        expect(numberRegex.test(newVotingNumber)).toBe(true);
    }));
    describe('Errors related to voting question', () => {
        test('A new voting cannot be created if question is missing.', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, null, true, true, ['option 1', 'option 2', 'option 3']);
            expect(response.status).toBe(400);
            expect(response.body).toContain('question');
            expect(response.body).toContain('missing');
        }));
        test('A new voting cannot be created if question is undefined.', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, null, true, true, ['option 1', 'option 2', 'option 3']);
            expect(response.status).toBe(400);
            expect(response.body).toContain('question');
            expect(response.body).toContain('missing');
        }));
        test('A new voting cannot be created if question is of wrong data type (number).', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 23456, true, true, ['option 1', 'option 2', 'option 3']);
            expect(response.status).toBe(400);
            expect(response.body).toContain('question');
            expect(response.body).toContain('not a string');
        }));
        test('A new voting cannot be created if question is of wrong data type (array).', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, ['one', 'two'], true, true, ['option 1', 'option 2', 'option 3']);
            expect(response.status).toBe(400);
            expect(response.body).toContain('question');
            expect(response.body).toContain('not a string');
        }));
    });
    describe('Errors related to showing voting names', () => {
        test('A new voting cannot be created if show names is missing.', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', null, true, ['option 1', 'option 2', 'option 3']);
            expect(response.status).toBe(400);
            expect(response.body).toContain('show names');
            expect(response.body).toContain('missing');
        }));
        test('A new voting cannot be created if show names is undefined.', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', undefined, true, ['option 1', 'option 2', 'option 3']);
            expect(response.status).toBe(400);
            expect(response.body).toContain('show names');
            expect(response.body).toContain('missing');
        }));
        test('A new voting cannot be created if show names is of wrong data type (string).', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', 'some string', true, ['option 1', 'option 2', 'option 3']);
            expect(response.status).toBe(400);
            expect(response.body).toContain('show names');
            expect(response.body).toContain('not a boolean');
        }));
        test('A new voting cannot be created if show names is of wrong data type (number).', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', 12345, true, ['option 1', 'option 2', 'option 3']);
            expect(response.status).toBe(400);
            expect(response.body).toContain('show names');
            expect(response.body).toContain('not a boolean');
        }));
        test('A new voting cannot be created if show names is of wrong data type (array).', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', [1, 2, 3], true, ['option 1', 'option 2', 'option 3']);
            expect(response.status).toBe(400);
            expect(response.body).toContain('show names');
            expect(response.body).toContain('not a boolean');
        }));
    });
    describe('Errors related to allowed answers count', () => {
        test('A new voting cannot be created if allowed count is missing.', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, null, ['option 1', 'option 2', 'option 3']);
            expect(response.status).toBe(400);
            expect(response.body).toContain('allowed count');
            expect(response.body).toContain('missing');
        }));
        test('A new voting cannot be created if allowed count is undefined.', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, undefined, ['option 1', 'option 2', 'option 3']);
            expect(response.status).toBe(400);
            expect(response.body).toContain('allowed count');
            expect(response.body).toContain('missing');
        }));
        test('A new voting cannot be created if allowed count is of wrong data type (string).', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, 'some string', ['option 1', 'option 2', 'option 3']);
            expect(response.status).toBe(400);
            expect(response.body).toContain('allowed count');
            expect(response.body).toContain('not a number');
        }));
        test('A new voting cannot be created if allowed count is of wrong data type (boolean).', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, true, ['option 1', 'option 2', 'option 3']);
            expect(response.status).toBe(400);
            expect(response.body).toContain('allowed count');
            expect(response.body).toContain('not a number');
        }));
        test('A new voting cannot be created if allowed count is of wrong data type (array).', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, [1, 2, 3], ['option 1', 'option 2', 'option 3']);
            expect(response.status).toBe(400);
            expect(response.body).toContain('allowed count');
            expect(response.body).toContain('not a number');
        }));
    });
    describe('Errors related to options', () => {
        test('A new voting cannot be created if options is missing.', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, 2, null);
            expect(response.status).toBe(400);
            expect(response.body).toContain('options');
            expect(response.body).toContain('missing');
        }));
        test('A new voting cannot be created if options is undefined.', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, 2, undefined);
            expect(response.status).toBe(400);
            expect(response.body).toContain('options');
            expect(response.body).toContain('missing');
        }));
        test('A new voting cannot be created if options is of wrong data type (plain string).', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, 2, 'option 1');
            expect(response.status).toBe(400);
            expect(response.body).toContain('options');
            expect(response.body).toContain('not a string array');
        }));
        test('A new voting cannot be created if options is of wrong data type (boolean).', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, 2, true);
            expect(response.status).toBe(400);
            expect(response.body).toContain('options');
            expect(response.body).toContain('not a string array');
        }));
        test('A new voting cannot be created if options is of wrong data type (array of numbers).', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, 2, [1, 2, 3]);
            expect(response.status).toBe(400);
            expect(response.body).toContain('options');
            expect(response.body).toContain('not a string array');
        }));
    });
    describe('Voting can be created and voting data retrieved from database.', () => {
        test('Answers to a voting can be added if proper input data is provided.', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']);
            const votingNumber = String(response.body);
            const votingResponse = yield testHelperFunctions_1.default.getVoting(server, votingNumber);
            const voting = votingResponse.body;
            const optionIds = voting.option_votes.map(item => {
                return item.id;
            });
            yield testHelperFunctions_1.default.addAnswers(server, 'Sanna Marin', optionIds);
            yield testHelperFunctions_1.default.addAnswers(server, 'Angela Merkel', optionIds);
            const votingWithVotesResponse = yield testHelperFunctions_1.default.getVoting(server, votingNumber);
            const votingWithVotes = votingWithVotesResponse.body;
            expect(votingWithVotes.question).toBe('Some question');
            expect(votingWithVotes.voting_number).toBe(votingNumber);
            expect(votingWithVotes.show_names).toBe(true);
            expect(votingWithVotes.allowed_count).toBe(3);
            expect(votingWithVotes.option_votes.length).toBe(3);
            expect(votingWithVotes.option_votes[0].option_text).toContain('option');
            expect(votingWithVotes.option_votes[0].option_voters.length).toBe(2);
            expect(votingWithVotes.option_votes[0].option_voters.sort()[0]).toBe('Angela Merkel');
            expect(votingWithVotes.option_votes[0].option_voters.sort()[1]).toBe('Sanna Marin');
        }));
    });
});
