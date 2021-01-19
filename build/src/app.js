"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const unknownEndpoint_1 = __importDefault(require("../utils/unknownEndpoint"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const votings_1 = __importDefault(require("./routes/votings"));
const answers_1 = __importDefault(require("./routes/answers"));
const configurations_1 = __importDefault(require("../utils/configurations"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
if (configurations_1.default.NODE_ENV !== 'test') {
    app.use(morgan_1.default('tiny'));
}
app.get('/healthz', (_request, response) => {
    response.send('OK');
});
app.use('/votings', votings_1.default);
app.use('/answers', answers_1.default);
app.use(unknownEndpoint_1.default);
app.use(errorHandler_1.default);
exports.default = app;
