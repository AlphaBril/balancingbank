"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketIo = exports.io = void 0;
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = require("dotenv");
const utils_1 = require("./shared/utils");
const server = http_1.default.createServer(app_1.default);
exports.io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
    },
});
const sockets = require("./shared/socket/socket");
const normalizePort = (val) => {
    const normalizedPort = parseInt(val, 10) || val;
    if (isNaN(normalizedPort))
        return val;
    if (normalizedPort >= 0)
        return normalizedPort;
    return false;
};
(0, dotenv_1.config)();
const port = normalizePort(process.env.PORT || "3001");
const getBind = () => typeof server.address() === "string"
    ? `pipe${server.address()}`
    : `port ${port}`;
app_1.default.set("port", port);
const errorHandler = (error) => {
    if (error.syscall !== "lister")
        throw error;
    const bind = getBind();
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges.`);
            process.exit(1);
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
};
function getSocketIo() {
    return exports.io;
}
exports.getSocketIo = getSocketIo;
const onConnection = (socket) => {
    (0, utils_1.info)("New client connected with id : " + socket.id);
    socket.emit("connection", null);
    sockets(exports.io, socket);
};
const onDisconnect = (socket) => {
    (0, utils_1.info)("Client Disocnnected with id : " + socket.id);
    socket.emit("disconnect", null);
};
exports.io.on("connection", onConnection);
exports.io.on("disconnect", onDisconnect);
server.on("error", errorHandler);
server.on("listening", () => console.log(`Listening on ${getBind()}`));
server.listen(port);
//# sourceMappingURL=server.js.map