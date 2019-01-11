"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = __importDefault(require("../../modules/user/routes"));
var auth_1 = __importDefault(require("../../modules/auth/auth"));
var Routes = /** @class */ (function () {
    function Routes(app, auth) {
        this.userRoutes = new routes_1.default();
        this.tokenRoutes = new auth_1.default();
        this.auth = auth;
        this.getRoutes(app);
    }
    Routes.prototype.getRoutes = function (app) {
        app.route('/api/users').all(this.auth.authenticate()).get(this.userRoutes.index);
        app.route('/api/users/:id').all(this.auth.authenticate()).get(this.userRoutes.findOne);
        app.route('/api/users').all(this.auth.authenticate()).post(this.userRoutes.create);
        app.route('/api/users/:id').all(this.auth.authenticate()).put(this.userRoutes.update);
        app.route('/api/users/:id').all(this.auth.authenticate()).delete(this.userRoutes.delete);
        app.route('/token').post(this.tokenRoutes.auth);
    };
    return Routes;
}());
exports.default = Routes;
//# sourceMappingURL=routes.js.map