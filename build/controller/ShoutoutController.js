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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Shoutout_1 = require("../entity/Shoutout");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = require("../entity/User");
exports.getAll = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, limit, pageNum, limitNum, shoutoutRepo, shoutouts, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, page = _a.page, limit = _a.limit;
                pageNum = parseInt(page) || 1;
                limitNum = parseInt(limit) || 10;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                shoutoutRepo = typeorm_1.getRepository(Shoutout_1.Shoutout);
                return [4 /*yield*/, shoutoutRepo.find({
                        order: {
                            created_at: "DESC",
                        },
                        take: limitNum,
                        skip: pageNum * limitNum - limitNum,
                    })];
            case 2:
                shoutouts = _b.sent();
                return [2 /*return*/, res.status(200).json(shoutouts)];
            case 3:
                err_1 = _b.sent();
                console.error(err_1);
                next(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getOne = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var shoutoutRepo, shoutout, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                shoutoutRepo = typeorm_1.getRepository(Shoutout_1.Shoutout);
                return [4 /*yield*/, shoutoutRepo.findOne(req.params.id)];
            case 1:
                shoutout = _a.sent();
                if (!shoutout) {
                    return [2 /*return*/, res.status(404).json({
                            message: "This shoutout doesnt exist.",
                        })];
                }
                return [2 /*return*/, res.status(200).json(shoutout)];
            case 2:
                err_2 = _a.sent();
                console.error(err_2);
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.create = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, token, conn, decodedToken, userRepo, user, shoutout, newShoutout, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body.body;
                token = req.headers.authorization.split(" ")[1];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                conn = typeorm_1.getConnection();
                decodedToken = jsonwebtoken_1.default.decode(token);
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.findOne(decodedToken["user_id"])];
            case 2:
                user = _a.sent();
                shoutout = new Shoutout_1.Shoutout();
                shoutout.body = body;
                shoutout.creator = user;
                return [4 /*yield*/, conn.manager.save(shoutout)];
            case 3:
                newShoutout = _a.sent();
                return [2 /*return*/, res.status(201).json(newShoutout)];
            case 4:
                err_3 = _a.sent();
                console.error(err_3);
                next(err_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=ShoutoutController.js.map