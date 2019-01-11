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
var config = require('../../config/env/config')();
function authSuccess(res, credentials, data) {
    var isMath = (credentials.password == data.password);
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
}
exports.default = authSuccess;
//# sourceMappingURL=authSuccess.js.map