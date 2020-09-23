"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../entity/User");
var Resource_1 = require("../entity/Resource");
var dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
dotenv_1.default.config();
exports.dbConfig = {
    type: "mysql",
    host: "bfdo2hscrucdpy5h0qwf-mysql.services.clever-cloud.com",
    port: 3306,
    username: "uhugihlulcdpio3u",
    password: "Dzy64SZPZv4eCeRY2rox",
    database: "bfdo2hscrucdpy5h0qwf",
    entities: [User_1.User, Resource_1.Resource],
    synchronize: true,
};
//# sourceMappingURL=DBConfig.js.map
