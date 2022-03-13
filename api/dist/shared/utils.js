"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalError = exports.badRequest = exports.conflict = exports.unauthorized = exports.notFound = exports.resWarn = exports.resError = exports.info = exports.error = exports.warn = exports.log = void 0;
var LogColor;
(function (LogColor) {
    LogColor["INFO"] = "\u001B[32m";
    LogColor["WARN"] = "\u001B[33m";
    LogColor["ERNO"] = "\u001B[31m";
    LogColor["RESET"] = "\u001B[0m";
})(LogColor || (LogColor = {}));
const log = (status, ...args) => {
    const time = new Date();
    console.info(LogColor[status], time, "|", `[${status}]: `, LogColor.RESET, ...args);
};
exports.log = log;
const warn = (...args) => (0, exports.log)("WARN", ...args);
exports.warn = warn;
const error = (...args) => (0, exports.log)("ERNO", ...args);
exports.error = error;
const info = (...args) => (0, exports.log)("INFO", ...args);
exports.info = info;
const resError = (res, status, message) => {
    (0, exports.error)(message);
    return res.status(status).json({ message });
};
exports.resError = resError;
const resWarn = (res, status, message) => {
    (0, exports.warn)(message);
    return res.status(status).json({ message });
};
exports.resWarn = resWarn;
const notFound = (res, message) => (0, exports.resWarn)(res, 404, message);
exports.notFound = notFound;
const unauthorized = (res, message) => (0, exports.resWarn)(res, 401, message);
exports.unauthorized = unauthorized;
const conflict = (res, message) => (0, exports.resWarn)(res, 409, message);
exports.conflict = conflict;
const badRequest = (res, message) => (0, exports.resWarn)(res, 400, message);
exports.badRequest = badRequest;
const internalError = (res) => (e) => (0, exports.resError)(res, 500, e);
exports.internalError = internalError;
//# sourceMappingURL=utils.js.map