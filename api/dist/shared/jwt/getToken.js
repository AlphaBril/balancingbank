"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.JWT_SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
const getToken = (args) => jsonwebtoken_1.default.sign(args, exports.JWT_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: 90,
});
exports.getToken = getToken;
//# sourceMappingURL=getToken.js.map