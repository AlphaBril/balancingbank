"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSTGRES_DATABASE = exports.POSTGRES_PASSWORD = exports.POSTGRES_LOGIN = exports.POSTGRES_PORT = exports.POSTGRES_ADDRESS = exports.POSTGRES_PROTOCOL = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.POSTGRES_PROTOCOL = "postgresql";
exports.POSTGRES_ADDRESS = process.env.POSTGRES_ADDRESS || "database.server.com";
exports.POSTGRES_PORT = process.env.POSTGRES_PORT || "3211";
exports.POSTGRES_LOGIN = process.env.POSTGRES_LOGIN || "dbuser";
exports.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "secret";
exports.POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || "mydb";
//# sourceMappingURL=postgres.js.map