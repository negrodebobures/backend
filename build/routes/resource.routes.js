"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ResourceController_1 = require("../controller/ResourceController");
var isAuthenticated_1 = require("../middleware/isAuthenticated");
var isAuthorized_1 = require("../middleware/isAuthorized");
var router = express_1.Router();
router.get("/resources", isAuthenticated_1.isAuthenticated, isAuthorized_1.isAuthorized, ResourceController_1.getAll);
router.get("/resources/:id", isAuthenticated_1.isAuthenticated, isAuthorized_1.isAuthorized, ResourceController_1.getOne);
router.post("/resources", isAuthenticated_1.isAuthenticated, isAuthorized_1.isAuthorized, ResourceController_1.getAll);
router.patch("/resources/:id", isAuthenticated_1.isAuthenticated, isAuthorized_1.isAuthorized, ResourceController_1.getAll);
router.delete("/resources/:id", isAuthenticated_1.isAuthenticated, isAuthorized_1.isAuthorized, ResourceController_1.getAll);
exports.default = router;
//# sourceMappingURL=resource.routes.js.map