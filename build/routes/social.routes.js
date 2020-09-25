"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = require("../controller/AuthController");
var routes = express_1.Router();
routes.post("/google", AuthController_1.oauthGoogle);
routes.post("/facebook", AuthController_1.oauthFacebook);
routes.post("/twitter", AuthController_1.oauthTwitter);
var router = express_1.Router();
router.use("/social-auth", routes);
exports.default = router;
//# sourceMappingURL=social.routes.js.map