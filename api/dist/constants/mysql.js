"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MYSQL_DATABASE = exports.MYSQL_PASSWORD = exports.MYSQL_LOGIN = exports.MYSQL_PORT = exports.MYSQL_ADDRESS = exports.MYSQL_PROTOCOL = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.MYSQL_PROTOCOL = "mysql";
exports.MYSQL_ADDRESS = process.env.MYSQL_ADDRESS || "host";
exports.MYSQL_PORT = process.env.MYSQL_PORT || "3306";
exports.MYSQL_LOGIN = process.env.MYSQL_LOGIN || "user";
exports.MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "pass";
exports.MYSQL_DATABASE = process.env.MYSQL_DATABASE || "db";
//# sourceMappingURL=mysql.js.map