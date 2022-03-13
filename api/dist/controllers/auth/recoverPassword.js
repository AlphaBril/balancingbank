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
exports.recoverPassword = void 0;
const utils_1 = require("../../shared/utils");
const mailer_1 = require("../../shared/mail/mailer");
const recoverPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    try {
        (0, mailer_1.sendMail)(email, "test", "test", mailer_1.CHANGE_PASSWORD_EMAIL);
        (0, utils_1.info)(`Email send !`);
        return res.status(200);
    }
    catch (e) {
        return (0, utils_1.internalError)(res)(e);
    }
    finally {
    }
});
exports.recoverPassword = recoverPassword;
//# sourceMappingURL=recoverPassword.js.map