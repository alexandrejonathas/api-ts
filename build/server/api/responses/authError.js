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
function authError(req, res) {
    res.sendStatus(HttpStatus.UNAUTHORIZED);
}
exports.default = authError;
//# sourceMappingURL=authError.js.map