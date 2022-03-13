"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
const { MongoClient } = require("mongodb");
const mongo_1 = require("../../constants/mongo");
const connectionString = mongo_1.MONGO_PROTOCOL + '://' + mongo_1.MONGO_LOGIN
    + ':' + mongo_1.MONGO_PASSWORD + '@' + mongo_1.MONGO_ADDRESS
    + ':' + mongo_1.MONGO_PORT;
const getClient = () => new MongoClient(connectionString);
exports.getClient = getClient;
// client.connect() -> client.query() -> client.end()
//# sourceMappingURL=mongo.js.map