"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const getToken_1 = require("../../shared/jwt/getToken");
const utils_1 = require("../../shared/utils");
const hashPassword_1 = require("./hashPassword");
const mailer_1 = require("../../shared/mail/mailer");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, name, surname } = req.body;
    const active = false;
    const valid = false;
    const token = (0, getToken_1.getToken)({ username });
    const userParams = {
        username,
        email,
        password,
        token,
        active,
        valid,
        name,
        surname,
    };
    userParams.password = yield (0, hashPassword_1.hashPassword)(password);
    try {
        (0, mailer_1.sendMail)(email, token, username, mailer_1.ACTIVATION_EMAIL);
        (0, utils_1.info)(`New user account, welcome to ${username}`);
        return res.status(200);
    }
    catch (e) {
        return (0, utils_1.internalError)(res)(e);
    }
    finally {
    }
});
exports.signup = signup;
//# sourceMappingURL=signup.js.map