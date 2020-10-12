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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.getAll = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.status(200).json(users)];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOne = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, username, user, password, userPublicData, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userRepo = typeorm_1.getRepository(User_1.User);
                username = req.params.username;
                return [4 /*yield*/, userRepo
                        .createQueryBuilder("user")
                        .where("LOWER(user.username) = LOWER(:username)", { username: username })
                        .getOne()];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({
                            message: "User not found.",
                        })];
                }
                password = user.password, userPublicData = __rest(user, ["password"]);
                return [2 /*return*/, res.status(200).json(userPublicData)];
            case 2:
                err_2 = _a.sent();
                console.error(err_2);
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, token, userId_1, _a, username, first_name, last_name, location_country, location_city, profile_picture, cover_picture, website, bio, usernameTaked, results, user, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                userRepo = typeorm_1.getRepository(User_1.User);
                token = req.headers.authorization.split(" ")[1];
                jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, function (err, decodedToken) {
                    if (err) {
                        return res.status(401).json({
                            message: "The token is invalid or has expired.",
                        });
                    }
                    userId_1 = decodedToken["user_id"];
                });
                _a = req.body, username = _a.username, first_name = _a.first_name, last_name = _a.last_name, location_country = _a.location_country, location_city = _a.location_city, profile_picture = _a.profile_picture, cover_picture = _a.cover_picture, website = _a.website, bio = _a.bio;
                return [4 /*yield*/, userRepo.findOne({
                        where: {
                            username: username,
                        },
                    })];
            case 1:
                usernameTaked = _b.sent();
                if (!!usernameTaked && usernameTaked.id !== userId_1) {
                    return [2 /*return*/, res.status(400).json({
                            errors: {
                                username: ["user with this username already exists."],
                            },
                        })];
                }
                return [4 /*yield*/, userRepo.update(userId_1, {
                        username: username,
                        first_name: first_name,
                        last_name: last_name,
                        location_country: location_country,
                        location_city: location_city,
                        profile_picture: profile_picture,
                        cover_picture: cover_picture,
                        website: website,
                        bio: bio,
                    })];
            case 2:
                results = _b.sent();
                return [4 /*yield*/, userRepo.findOne(userId_1)];
            case 3:
                user = _b.sent();
                return [2 /*return*/, res.status(200).json(user)];
            case 4:
                err_3 = _b.sent();
                console.error(err_3);
                next(err_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=UserController.js.map