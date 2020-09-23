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
var User_1 = require("../entity/User");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var google_auth_library_1 = require("google-auth-library");
exports.me = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, user;
    return __generator(this, function (_a) {
        try {
            token = req.headers.authorization.split(" ")[1];
            user = jsonwebtoken_1.default.decode(token);
            return [2 /*return*/, res.status(200).json(user)];
        }
        catch (err) {
            console.error(err);
            next(err);
        }
        return [2 /*return*/];
    });
}); };
exports.oauthFacebook = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, username, user, userRepo, registered, userHelper, jwtPayload, accessToken, refreshToken_1, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                username = name.split(" ").join("");
                user = { username: username, email: email };
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.findOne({
                        where: [
                            {
                                email: user.email,
                            },
                            {
                                username: user.username,
                            },
                        ],
                    })];
            case 2:
                registered = _b.sent();
                userHelper = void 0;
                if (!!registered) return [3 /*break*/, 4];
                return [4 /*yield*/, userRepo.save(user)];
            case 3:
                userHelper = _b.sent();
                _b.label = 4;
            case 4:
                jwtPayload = {
                    user_id: registered ? registered.id : userHelper.id,
                    email: user.email,
                    username: user.username,
                };
                accessToken = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_SECRET, {
                    expiresIn: "1m",
                });
                refreshToken_1 = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_SECRET, {
                    expiresIn: "48h",
                });
                return [2 /*return*/, res
                        .cookie("Authorization", refreshToken_1, {
                        path: "/",
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000,
                    })
                        .status(200)
                        .json({ accessToken: accessToken })];
            case 5:
                err_1 = _b.sent();
                next(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.oauthGoogle = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, wc, payload, email, name, username, user, userRepo, registered, userHelper, jwtPayload, accessToken, refreshToken_2, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID);
                wc = req.body.wc;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, verifyAndGet(wc.id_token, client, process.env.CLIENT_ID)];
            case 2:
                payload = _a.sent();
                email = payload.email, name = payload.name;
                username = name.split(" ").join("");
                user = { username: username, email: email };
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.findOne({
                        where: [
                            {
                                email: user.email,
                            },
                            {
                                username: user.username,
                            },
                        ],
                    })];
            case 3:
                registered = _a.sent();
                userHelper = void 0;
                if (!!registered) return [3 /*break*/, 5];
                return [4 /*yield*/, userRepo.save(user)];
            case 4:
                userHelper = _a.sent();
                _a.label = 5;
            case 5:
                jwtPayload = {
                    user_id: registered ? registered.id : userHelper.id,
                    email: user.email,
                    username: user.username,
                };
                accessToken = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_SECRET, {
                    expiresIn: "1m",
                });
                refreshToken_2 = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_SECRET, {
                    expiresIn: "48h",
                });
                return [2 /*return*/, res
                        .cookie("Authorization", refreshToken_2, {
                        path: "/",
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000,
                    })
                        .status(200)
                        .json({ accessToken: accessToken })];
            case 6:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userRepo, user, payload, accessToken, refreshToken_3, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                userRepo = typeorm_1.getRepository(User_1.User);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userRepo.findOne({
                        where: {
                            email: email,
                        },
                    })];
            case 2:
                user = _b.sent();
                if (!user || user.password !== password) {
                    return [2 /*return*/, res.status(401).json({
                            errors: {
                                detail: "Incorrect email password combination,check and try again",
                            },
                        })];
                }
                payload = {
                    user_id: user.id,
                    email: user.email,
                    username: user.username,
                };
                accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: "1m",
                });
                refreshToken_3 = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: "48h",
                });
                return [2 /*return*/, res
                        .cookie("Authorization", refreshToken_3, {
                        path: "/",
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000,
                    })
                        .status(200)
                        .json({ accessToken: accessToken })];
            case 3:
                err_3 = _b.sent();
                console.error(err_3);
                next(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, username, userRepo, emailUsed, usernameUsed, newUser, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, username = _a.username;
                userRepo = typeorm_1.getRepository(User_1.User);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, findByEmail(email)];
            case 2:
                emailUsed = _b.sent();
                return [4 /*yield*/, findByUsername(username)];
            case 3:
                usernameUsed = _b.sent();
                if (emailUsed && usernameUsed) {
                    return [2 /*return*/, res.status(400).json({
                            errors: {
                                email: ["user with this email already exists."],
                                username: ["user with this username already exists."],
                            },
                        })];
                }
                if (emailUsed) {
                    return [2 /*return*/, res.status(400).json({
                            errors: {
                                email: ["user with this email already exists."],
                            },
                        })];
                }
                if (usernameUsed) {
                    return [2 /*return*/, res.status(400).json({
                            errors: {
                                username: ["user with this username already exists."],
                            },
                        })];
                }
                return [4 /*yield*/, userRepo.save({
                        email: email,
                        password: password,
                        username: username,
                    })];
            case 4:
                newUser = _b.sent();
                return [2 /*return*/, res.status(200).json(newUser)];
            case 5:
                err_4 = _b.sent();
                console.error(err_4);
                next(err_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.refreshToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var cookies, tokenInCookie, accessPayload_1, newPayload, accessToken;
    return __generator(this, function (_a) {
        try {
            cookies = req.cookies;
            tokenInCookie = req.cookies.Authorization;
            if (!tokenInCookie) {
                return [2 /*return*/, res.status(400).json({
                        message: "Refresh token missed.",
                    })];
            }
            jsonwebtoken_1.default.verify(tokenInCookie, process.env.JWT_SECRET, function (err, decodedToken) {
                if (err) {
                    return res.status(401).json({
                        message: "The token is invalid or has expired.",
                    });
                }
                accessPayload_1 = decodedToken;
            });
            newPayload = {
                user_id: accessPayload_1["user_id"],
                email: accessPayload_1["email"],
                username: accessPayload_1["username"],
            };
            console.log("payload: ", newPayload);
            accessToken = jsonwebtoken_1.default.sign(newPayload, process.env.JWT_SECRET, {
                expiresIn: "1m",
            });
            return [2 /*return*/, res.status(200).json({ accessToken: accessToken })];
        }
        catch (err) {
            console.error(err);
            next(err);
        }
        return [2 /*return*/];
    });
}); };
exports.logout = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            return [2 /*return*/, res
                    .cookie("Authorization", "", {
                    path: "/",
                    httpOnly: true,
                    maxAge: 3600,
                })
                    .status(200)
                    .json({ message: "The user has logout successfully." })];
        }
        catch (err) {
            console.error(err);
            next(err);
        }
        return [2 /*return*/];
    });
}); };
var findByEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, check, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepo = typeorm_1.getRepository(User_1.User);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userRepo.findOne({
                        where: {
                            email: email,
                        },
                    })];
            case 2:
                check = _a.sent();
                return [2 /*return*/, !!check];
            case 3:
                err_5 = _a.sent();
                throw err_5;
            case 4: return [2 /*return*/];
        }
    });
}); };
var findByUsername = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, check, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepo = typeorm_1.getRepository(User_1.User);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userRepo.findOne({
                        where: {
                            username: username,
                        },
                    })];
            case 2:
                check = _a.sent();
                return [2 /*return*/, !!check];
            case 3:
                err_6 = _a.sent();
                throw err_6;
            case 4: return [2 /*return*/];
        }
    });
}); };
var alreadyRegistered = function (body, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, username, emailUsed, usernameUsed, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = body.email, username = body.username;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, findByEmail(email)];
            case 2:
                emailUsed = _a.sent();
                return [4 /*yield*/, findByUsername(username)];
            case 3:
                usernameUsed = _a.sent();
                if (emailUsed && usernameUsed) {
                    return [2 /*return*/, res.status(400).json({
                            errors: {
                                email: ["user with this email already exists."],
                                username: ["user with this username already exists."],
                            },
                        })];
                }
                if (emailUsed) {
                    return [2 /*return*/, res.status(400).json({
                            errors: {
                                email: ["user with this email already exists."],
                            },
                        })];
                }
                if (usernameUsed) {
                    return [2 /*return*/, res.status(400).json({
                            errors: {
                                username: ["user with this username already exists."],
                            },
                        })];
                }
                return [3 /*break*/, 5];
            case 4:
                err_7 = _a.sent();
                throw err_7;
            case 5: return [2 /*return*/];
        }
    });
}); };
// OAUTH VERIFIERS
function verifyAndGet(token, client, CLIENT_ID) {
    return __awaiter(this, void 0, void 0, function () {
        var ticket, payload;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.verifyIdToken({
                        idToken: token,
                        audience: CLIENT_ID,
                    })];
                case 1:
                    ticket = _a.sent();
                    payload = ticket.getPayload();
                    return [2 /*return*/, payload];
            }
        });
    });
}
//# sourceMappingURL=AuthController.js.map