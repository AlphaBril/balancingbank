"use strict";
module.exports = (io, socket) => {
    const update = function (payload) {
        console.log("user updated");
    };
    const disconnect = function (payload) {
        console.log("user disconnected");
    };
    socket.on("order:update", update);
    socket.on("disconnect", disconnect);
    socket.on("logout", disconnect);
};
//# sourceMappingURL=socket.js.map