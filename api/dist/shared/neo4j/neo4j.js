"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSession = exports.getDriver = void 0;
const neo4j_driver_1 = __importDefault(require("neo4j-driver"));
const neo4j_1 = require("../../constants/neo4j");
const neo4jAuth = neo4j_driver_1.default.auth.basic(neo4j_1.NEO4J_LOGIN, neo4j_1.NEO4J_PASSWORD);
const authOptions = { disableLosslessIntegers: true };
const getDriver = () => neo4j_driver_1.default.driver(`${neo4j_1.NEO4J_PROTOCOL}://${neo4j_1.NEO4J_ADDRESS}:${neo4j_1.NEO4J_PORT}`, neo4jAuth, authOptions);
exports.getDriver = getDriver;
const getSession = () => (0, exports.getDriver)().session();
exports.getSession = getSession;
// session = getSession() -> session.run() -> session.close()
//# sourceMappingURL=neo4j.js.map