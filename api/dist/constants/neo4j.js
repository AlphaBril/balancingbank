"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEO4J_PASSWORD = exports.NEO4J_LOGIN = exports.NEO4J_PORT = exports.NEO4J_ADDRESS = exports.NEO4J_PROTOCOL = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.NEO4J_PROTOCOL = "neo4j";
exports.NEO4J_ADDRESS = process.env.NEO4J_ADDRESS || "";
exports.NEO4J_PORT = process.env.NEO4J_PORT || "";
exports.NEO4J_LOGIN = process.env.NEO4J_LOGIN || "";
exports.NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || "";
//# sourceMappingURL=neo4j.js.map