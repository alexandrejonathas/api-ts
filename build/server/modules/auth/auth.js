"use strict";
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
var _ = __importStar(require("lodash"));
var service_1 = __importDefault(require("../user/service"));
var authSuccess_1 = __importDefault(require("../../api/responses/authSuccess"));
var authError_1 = __importDefault(require("../../api/responses/authError"));
var TokenRoutes = /** @class */ (function () {
    function TokenRoutes() {
    }
    TokenRoutes.prototype.auth = function (req, res) {
        var credentials = {
            email: req.body.email,
            password: req.body.password
        };
        if (credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')) {
            service_1.default.getByEmail(credentials.email)
                .then(_.partial(authSuccess_1.default, res, credentials))
                .catch(_.partial(authError_1.default, req, res));
        }
    };
    return TokenRoutes;
}());
exports.default = TokenRoutes;
//# sourceMappingURL=auth.js.map