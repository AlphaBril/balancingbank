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
exports.changeSurname = void 0;
const utils_1 = require("../../shared/utils");
const changeSurname = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.body.token;
    const surname = req.body.surname;
    try {
        console.log(token, surname);
        (0, utils_1.info)(`Surname Updated !`);
        return res.status(200);
    }
    catch (e) {
        return (0, utils_1.internalError)(res)(e);
    }
    finally {
    }
});
exports.changeSurname = changeSurname;
//# sourceMappingURL=updateSurname.js.map