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
exports.checkPassword = void 0;
function checkPassword(password, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        const bcrypt = require("bcrypt");
        const checkedPassword = yield new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
        return checkedPassword;
    });
}
exports.checkPassword = checkPassword;
//# sourceMappingURL=checkPassword.js.map