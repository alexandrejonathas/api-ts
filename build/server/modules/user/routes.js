"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = __importDefault(require("./controller"));
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
    }
    UserRoutes.prototype.index = function (req, res) {
        return controller_1.default.getAll(req, res);
    };
    UserRoutes.prototype.findOne = function (req, res) {
        return controller_1.default.findOne(req, res);
    };
    UserRoutes.prototype.create = function (req, res) {
        return controller_1.default.create(req, res);
    };
    UserRoutes.prototype.update = function (req, res) {
        return controller_1.default.update(req, res);
    };
    UserRoutes.prototype.delete = function (req, res) {
        return controller_1.default.delete(req, res);
    };
    return UserRoutes;
}());
exports.default = UserRoutes;
//# sourceMappingURL=routes.js.map