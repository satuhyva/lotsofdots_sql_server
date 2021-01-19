"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryCreateTableAnswer = void 0;
exports.queryCreateTableAnswer = 'CREATE TABLE answer(' +
    'id SERIAL PRIMARY KEY, ' +
    'option_id INTEGER NOT NULL, ' +
    'name VARCHAR, ' +
    'deleted BOOLEAN DEFAULT false, ' +
    'CONSTRAINT fk_option FOREIGN KEY(option_id) REFERENCES option(id) ' +
    ');';
