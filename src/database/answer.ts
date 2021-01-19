export const queryCreateTableAnswer =
    'CREATE TABLE answer(' +
    'id SERIAL PRIMARY KEY, ' +
    'option_id INTEGER NOT NULL, ' +
    'name VARCHAR, ' +
    'deleted BOOLEAN DEFAULT false, ' +
    'CONSTRAINT fk_option FOREIGN KEY(option_id) REFERENCES option(id) ' +
    ');'