"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_PASSWORD = exports.MONGO_LOGIN = exports.MONGO_PORT = exports.MONGO_ADDRESS = exports.MONGO_PROTOCOL = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.MONGO_PROTOCOL = "mongodb";
exports.MONGO_ADDRESS = process.env.MONGO_ADDRESS || "sample.host";
exports.MONGO_PORT = process.env.MONGO_PORT || "27017";
exports.MONGO_LOGIN = process.env.MONGO_LOGIN || "user";
exports.MONGO_PASSWORD = process.env.MONGO_PASSWORD || "pass";
//# sourceMappingURL=mongo.js.map