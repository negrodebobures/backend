"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../controller/UserController");
var isAuthenticated_1 = require("../middleware/isAuthenticated");
var router = express_1.Router();
router.get("/users", isAuthenticated_1.isAuthenticated, UserController_1.getAll);
exports.default = router;
//# sourceMappingURL=user.routes.js.map