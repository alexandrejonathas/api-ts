"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var body_parser_1 = __importDefault(require("body-parser"));
var routes_1 = __importDefault(require("./routes/routes"));
var errorHandlerApi_1 = require("./errorHandlerApi");
var auth_1 = __importDefault(require("../auth"));
var Api = /** @class */ (function () {
    function Api() {
        this.express = express_1.default();
        this.auth = auth_1.default();
        this.middleware();
    }
    Api.prototype.middleware = function () {
        this.express.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            next();
        });
        this.express.use(morgan_1.default('dev'));
        this.express.use(body_parser_1.default.urlencoded({ "extended": true }));
        this.express.use(body_parser_1.default.json());
        this.express.use(errorHandlerApi_1.errorHandlerApi);
        this.express.use(this.auth.initialize());
        this.router(this.express, this.auth);
    };
    Api.prototype.router = function (app, auth) {
        new routes_1.default(app, auth);
    };
    return Api;
}());
exports.default = new Api().express;
//# sourceMappingURL=api.js.map