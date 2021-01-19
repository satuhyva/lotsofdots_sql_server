"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryCreateTableOption = void 0;
exports.queryCreateTableOption = 'CREATE TABLE option(' +
    'id SERIAL PRIMARY KEY, ' +
    'voting_id INTEGER NOT NULL, ' +
    'option_text VARCHAR NOT NULL, ' +
    'deleted BOOLEAN DEFAULT false, ' +
    'CONSTRAINT fk_voting FOREIGN KEY(voting_id) REFERENCES voting(id) ' +
    ');';
