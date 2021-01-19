"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const voting_1 = require("./voting");
const option_1 = require("./option");
const answer_1 = require("./answer");
const databaseConfigurations = {
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    database: 'postgres',
    password: 'postgres',
    ssl: false
};
const client = new pg_1.default.Client(databaseConfigurations);
const createOrResetDatabase = () => {
    const query = 'DROP TABLE IF EXISTS answer; ' +
        'DROP TABLE IF EXISTS option; ' +
        'DROP TABLE IF EXISTS voting; '
            .concat(voting_1.queryCreateTableVoting)
            .concat(option_1.queryCreateTableOption)
            .concat(answer_1.queryCreateTableAnswer);
    client
        .query(query)
        .then(() => {
        console.log('Tables reset or created succesfully!');
        void client.end();
        process.exit();
    })
        .catch(error => {
        console.log(error);
        process.exit();
    });
};
client.connect(error => {
    if (error)
        throw error;
    createOrResetDatabase();
});
