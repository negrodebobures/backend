"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../controller/UserController");
var isAuthenticated_1 = require("../middleware/isAuthenticated");
var router = express_1.Router();
router.get("/users", isAuthenticated_1.isAuthenticated, UserController_1.getAll);
router.get("/users/:username", isAuthenticated_1.isAuthenticated, UserController_1.getOne);
router.patch("/users/:username", isAuthenticated_1.isAuthenticated, UserController_1.update);
exports.default = router;
//# sourceMappingURL=user.routes.js.map