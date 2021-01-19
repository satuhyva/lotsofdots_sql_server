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
const testHelperFunctions_1 = __importDefault(require("./testHelperFunctions"));
describe('ADD ANSWERS TO VOTING', () => {
    test('Answers to a voting can be added if proper input data is provided.', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']);
        const votingNumber = String(response.body);
        const votingResponse = yield testHelperFunctions_1.default.getVoting(server, votingNumber);
        const voting = votingResponse.body;
        const optionIds = voting.option_votes.map(item => {
            return item.id;
        });
        const addAnswersResponse = yield testHelperFunctions_1.default.addAnswers(server, 'Sanna Marin', optionIds);
        expect(addAnswersResponse.status).toBe(200);
        expect(addAnswersResponse.body).toContain('successfully');
    }));
    test('Answers to a voting can be added even without the name.', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']);
        const votingNumber = String(response.body);
        const votingResponse = yield testHelperFunctions_1.default.getVoting(server, votingNumber);
        const voting = votingResponse.body;
        const optionIds = voting.option_votes.map(item => {
            return item.id;
        });
        const addAnswersResponse = yield testHelperFunctions_1.default.addAnswers(server, null, optionIds);
        expect(addAnswersResponse.status).toBe(200);
        expect(addAnswersResponse.body).toContain('successfully');
    }));
    describe('Errors related to adding name', () => {
        test('Answers to a voting cannot be added if name is of wrong data type (number).', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']);
            const votingNumber = String(response.body);
            const votingResponse = yield testHelperFunctions_1.default.getVoting(server, votingNumber);
            const voting = votingResponse.body;
            const optionIds = voting.option_votes.map(item => {
                return item.id;
            });
            const addAnswersResponse = yield testHelperFunctions_1.default.addAnswers(server, 2, optionIds);
            expect(addAnswersResponse.status).toBe(400);
            expect(addAnswersResponse.body).toContain('name');
            expect(addAnswersResponse.body).toContain('not a string');
        }));
        test('Answers to a voting cannot be added if name is of wrong data type (boolean).', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']);
            const votingNumber = String(response.body);
            const votingResponse = yield testHelperFunctions_1.default.getVoting(server, votingNumber);
            const voting = votingResponse.body;
            const optionIds = voting.option_votes.map(item => {
                return item.id;
            });
            const addAnswersResponse = yield testHelperFunctions_1.default.addAnswers(server, true, optionIds);
            expect(addAnswersResponse.status).toBe(400);
            expect(addAnswersResponse.body).toContain('name');
            expect(addAnswersResponse.body).toContain('not a string');
        }));
        test('Answers to a voting cannot be added if name is of wrong data type (array of strings).', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']);
            const votingNumber = String(response.body);
            const votingResponse = yield testHelperFunctions_1.default.getVoting(server, votingNumber);
            const voting = votingResponse.body;
            const optionIds = voting.option_votes.map(item => {
                return item.id;
            });
            const addAnswersResponse = yield testHelperFunctions_1.default.addAnswers(server, ['Sanna Marin', 'Angela Merkel'], optionIds);
            expect(addAnswersResponse.status).toBe(400);
            expect(addAnswersResponse.body).toContain('name');
            expect(addAnswersResponse.body).toContain('not a string');
        }));
    });
    describe('Errors related to adding answers', () => {
        test('Answers to a voting cannot be added if answers are missing.', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']);
            const addAnswersResponse = yield testHelperFunctions_1.default.addAnswers(server, 'Angela Merkel', null);
            expect(addAnswersResponse.status).toBe(400);
            expect(addAnswersResponse.body).toContain('answers');
            expect(addAnswersResponse.body).toContain('not a number array');
        }));
        test('Answers to a voting cannot be added if answers are of wrong data type (string array).', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']);
            const addAnswersResponse = yield testHelperFunctions_1.default.addAnswers(server, 'Angela Merkel', ['1', '2']);
            expect(addAnswersResponse.status).toBe(400);
            expect(addAnswersResponse.body).toContain('answers');
            expect(addAnswersResponse.body).toContain('not a number array');
        }));
        test('Answers to a voting cannot be added if answers are of wrong data type (string).', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']);
            const addAnswersResponse = yield testHelperFunctions_1.default.addAnswers(server, 'Angela Merkel', '1');
            expect(addAnswersResponse.status).toBe(400);
            expect(addAnswersResponse.body).toContain('answers');
            expect(addAnswersResponse.body).toContain('not a number array');
        }));
        test('Answers to a voting cannot be added if answers are of wrong data type (boolean).', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']);
            const addAnswersResponse = yield testHelperFunctions_1.default.addAnswers(server, 'Angela Merkel', true);
            expect(addAnswersResponse.status).toBe(400);
            expect(addAnswersResponse.body).toContain('answers');
            expect(addAnswersResponse.body).toContain('not a number array');
        }));
        test('Answers to a voting cannot be added if answers are of wrong data type (simple number).', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testHelperFunctions_1.default.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']);
            const addAnswersResponse = yield testHelperFunctions_1.default.addAnswers(server, 'Angela Merkel', 2);
            expect(addAnswersResponse.status).toBe(400);
            expect(addAnswersResponse.body).toContain('answers');
            expect(addAnswersResponse.body).toContain('not a number array');
        }));
    });
});
