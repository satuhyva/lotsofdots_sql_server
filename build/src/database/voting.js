"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryCreateTableVoting = void 0;
exports.queryCreateTableVoting = 'CREATE TABLE voting(' +
    'id SERIAL PRIMARY KEY, ' +
    'question VARCHAR NOT NULL, ' +
    'voting_number VARCHAR UNIQUE NOT NULL, ' +
    'show_names BOOLEAN DEFAULT false NOT NULL, ' +
    'allowed_count INTEGER DEFAULT 1 NOT NULL, ' +
    'created DATE, ' +
    'deleted BOOLEAN DEFAULT false' +
    ');';
