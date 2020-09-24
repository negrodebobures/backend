"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = require("../controller/AuthController");
var isAuthenticated_1 = require("../middleware/isAuthenticated");
var routes = express_1.Router();
routes.get("/me", AuthController_1.me);
routes.post("/login", AuthController_1.login);
routes.post("/register", AuthController_1.register);
routes.get("/refresh_token", AuthController_1.refreshToken);
routes.post("/logout", isAuthenticated_1.isAuthenticated, AuthController_1.logout);
var router = express_1.Router();
router.use("/auth", routes);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map