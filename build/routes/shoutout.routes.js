"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var isAuthenticated_1 = require("../middleware/isAuthenticated");
var ShoutoutController_1 = require("../controller/ShoutoutController");
var router = express_1.Router();
router.get("/shoutouts", ShoutoutController_1.getAll);
router.get("/shoutouts/:id", isAuthenticated_1.isAuthenticated, ShoutoutController_1.getOne);
router.post("/shoutouts", ShoutoutController_1.create);
exports.default = router;
//# sourceMappingURL=shoutout.routes.js.map