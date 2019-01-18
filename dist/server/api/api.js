"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var body_parser_1 = __importDefault(require("body-parser"));
var routes_1 = __importDefault(require("./routes/routes"));
var handle_1 = __importDefault(require("./responses/handle"));
var auth_1 = __importDefault(require("../auth"));
var Api = /** @class */ (function () {
    function Api() {
        this.express = express_1.default();
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
        this.express.use(handle_1.default.errorHandlerApi);
        this.express.use(auth_1.default.config().initialize());
        this.router(this.express, auth_1.default);
    };
    Api.prototype.router = function (app, auth) {
        routes_1.default.initRoutes(app, auth);
    };
    return Api;
}());
exports.default = new Api().express;
