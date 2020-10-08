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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var express_1 = __importStar(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var user_routes_1 = __importDefault(require("./routes/user.routes"));
var auth_routes_1 = __importDefault(require("./routes/auth.routes"));
var social_routes_1 = __importDefault(require("./routes/social.routes"));
var resource_routes_1 = __importDefault(require("./routes/resource.routes"));
var shoutout_routes_1 = __importDefault(require("./routes/shoutout.routes"));
var DBConfig_1 = require("./config/DBConfig");
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
typeorm_1.createConnection(DBConfig_1.dbConfig)
    .then(function (connection) { return __awaiter(void 0, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dotenv_1.default.config();
                return [4 /*yield*/, connection.synchronize()];
            case 1:
                _a.sent();
                app = express_1.default();
                // Middlewares
                app.use(express_1.json());
                app.use(express_1.urlencoded({ extended: true }));
                app.use(cookie_parser_1.default());
                app.use(morgan_1.default("dev"));
                app.use(cors_1.default({ origin: [process.env.ORIGIN, "https://shoutmo-test.netlify.app"], credentials: true }));
                // Routes
                app.use("/api", resource_routes_1.default);
                app.use("/api", user_routes_1.default);
                app.use("/api", auth_routes_1.default);
                app.use("/api", social_routes_1.default);
                app.use("/api", shoutout_routes_1.default);
                // start express server
                app.listen(process.env.PORT, function () {
                    console.log("Server running on http://" + process.env.HOST + ":" + process.env.PORT);
                });
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (error) { return console.log(error); });
//# sourceMappingURL=index.js.map
