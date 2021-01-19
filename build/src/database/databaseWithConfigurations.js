"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = __importDefault(require("../../utils/configurations"));
const pg_promise_1 = __importDefault(require("pg-promise"));
const databaseConfigurations = {
    host: configurations_1.default.DB_HOST || 'localhost',
    user: configurations_1.default.DB_USER || 'localhost',
    port: Number(configurations_1.default.DB_PORT) || 5432,
    database: configurations_1.default.DB_DATABASE || 'localhost',
    password: configurations_1.default.DB_PASSWORD || 'localhost',
    ssl: configurations_1.default.DB_SSL === 'true' ? true : false,
};
const initializationOptions = {};
const pgpWithInitializationOptions = pg_promise_1.default(initializationOptions);
exports.default = pgpWithInitializationOptions(databaseConfigurations);
