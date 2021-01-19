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
describe('SERVER BASIC TESTS', () => {
    test('Server can be started and a GET request to /healthz results in an "OK" response', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield server
            .get('/healthz')
            .send();
        expect(response.status).toBe(200);
        expect(response.text).toBe('OK');
    }));
    test('Unknown endpoint returns unknown endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield server
            .get('/someunknownendpoint')
            .send();
        expect(response.status).toBe(404);
        expect(response.text).toContain('UNKNOWN ENDPOINT');
    }));
});
