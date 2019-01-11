"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandlerApi(err, req, res, next) {
    console.error("API error handler foi executado: " + err);
    res.status(500).json({
        errorCode: 'ERR-001',
        message: 'Error interno do servidor'
    });
}
exports.errorHandlerApi = errorHandlerApi;
//# sourceMappingURL=errorHandlerApi.js.map