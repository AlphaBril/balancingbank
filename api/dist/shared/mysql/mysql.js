"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDriver = void 0;
const mysql = require("mysql");
const mysql_1 = require("../../constants/mysql");
const connectionString = mysql_1.MYSQL_PROTOCOL + '://' + mysql_1.MYSQL_LOGIN
    + ':' + mysql_1.MYSQL_PASSWORD + '@' + mysql_1.MYSQL_ADDRESS
    + ':' + mysql_1.MYSQL_PORT + '/' + mysql_1.MYSQL_DATABASE;
const connection = mysql.createConnection(connectionString);
const getDriver = () => connection;
exports.getDriver = getDriver;
// client.connect() -> client.query() -> client.end()
//# sourceMappingURL=mysql.js.map