"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = __importDefault(require("./controller"));
var PostRoutes = /** @class */ (function () {
    function PostRoutes() {
    }
    PostRoutes.prototype.index = function (req, res) {
        return controller_1.default.getAll(req, res);
    };
    PostRoutes.prototype.findOne = function (req, res) {
        return controller_1.default.findOne(req, res);
    };
    PostRoutes.prototype.create = function (req, res) {
        return controller_1.default.create(req, res);
    };
    PostRoutes.prototype.update = function (req, res) {
        return controller_1.default.update(req, res);
    };
    PostRoutes.prototype.delete = function (req, res) {
        return controller_1.default.delete(req, res);
    };
    return PostRoutes;
}());
exports.default = new PostRoutes();
