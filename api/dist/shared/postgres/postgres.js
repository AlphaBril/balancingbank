"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
const { Client } = require("pg");
const postgres_1 = require("../../constants/postgres");
const connectionString = postgres_1.POSTGRES_PROTOCOL + '://' + postgres_1.POSTGRES_LOGIN
    + ':' + postgres_1.POSTGRES_PASSWORD + '@' + postgres_1.POSTGRES_ADDRESS
    + ':' + postgres_1.POSTGRES_PORT + '/' + postgres_1.POSTGRES_DATABASE;
const getClient = () => new Client({ connectionString });
exports.getClient = getClient;
// client.connect() -> client.query() -> client.end()
//# sourceMappingURL=postgres.js.map