"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var HttpStatus = __importStar(require("http-status"));
var jwt = __importStar(require("jwt-simple"));
var bcrypt = __importStar(require("bcrypt"));
var config = require('../../config/env/config')();
var Handler = /** @class */ (function () {
    function Handler() {
    }
    Handler.prototype.authSuccess = function (res, credentials, data) {
        var isMath = bcrypt.compare(credentials.password, data.password);
        if (isMath) {
            var payload = {
                id: data.id
            };
            res.json({
                token: jwt.encode(payload, config.secret)
            });
        }
        else {
            res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
    };
    Handler.prototype.authError = function (req, res) {
        res.sendStatus(HttpStatus.UNAUTHORIZED);
    };
    Handler.prototype.onSuccess = function (res, data) {
        res.status(HttpStatus.OK).json({ payload: data });
    };
    Handler.prototype.onError = function (res, message, err) {
        console.log("Error: " + err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: message });
    };
    Handler.prototype.errorHandlerApi = function (err, req, res, next) {
        console.error("API error handler foi executado: " + err);
        res.status(500).json({
            errorCode: 'ERR-001',
            message: 'Error interno do servidor'
        });
    };
    Handler.prototype.dbError = function (res, err) {
        console.log("Error: " + err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: 'ERR-001',
            message: 'Error no banco de dados'
        });
    };
    return Handler;
}());
exports.default = new Handler();
//# sourceMappingURL=handle.js.map