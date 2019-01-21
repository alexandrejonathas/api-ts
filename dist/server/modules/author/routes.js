"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = __importDefault(require("./controller"));
var AuthorRoutes = /** @class */ (function () {
    function AuthorRoutes() {
    }
    AuthorRoutes.prototype.index = function (req, res) {
        return controller_1.default.getAll(req, res);
    };
    AuthorRoutes.prototype.findOne = function (req, res) {
        return controller_1.default.findOne(req, res);
    };
    AuthorRoutes.prototype.create = function (req, res) {
        return controller_1.default.create(req, res);
    };
    AuthorRoutes.prototype.update = function (req, res) {
        return controller_1.default.update(req, res);
    };
    AuthorRoutes.prototype.delete = function (req, res) {
        return controller_1.default.delete(req, res);
    };
    return AuthorRoutes;
}());
exports.default = new AuthorRoutes();
