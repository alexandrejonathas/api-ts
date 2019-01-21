"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = __importDefault(require("../../modules/auth/auth"));
var routes_1 = __importDefault(require("../../modules/user/routes"));
var routes_2 = __importDefault(require("../../modules/author/routes"));
var routes_3 = __importDefault(require("../../modules/post/routes"));
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.prototype.initRoutes = function (app, auth) {
        app.route('/api/users').all(auth.config().authenticate()).get(routes_1.default.index);
        app.route('/api/users/:id').all(auth.config().authenticate()).get(routes_1.default.findOne);
        app.route('/api/users').all(auth.config().authenticate()).post(routes_1.default.create);
        app.route('/api/users/:id').all(auth.config().authenticate()).put(routes_1.default.update);
        app.route('/api/users/:id').all(auth.config().authenticate()).delete(routes_1.default.delete);
        app.route('/api/authors').all(auth.config().authenticate()).get(routes_2.default.index);
        app.route('/api/authors/:id').all(auth.config().authenticate()).get(routes_2.default.findOne);
        app.route('/api/authors').all(auth.config().authenticate()).post(routes_2.default.create);
        app.route('/api/authors/:id').all(auth.config().authenticate()).put(routes_2.default.update);
        app.route('/api/authors/:id').all(auth.config().authenticate()).delete(routes_2.default.delete);
        app.route('/api/posts').all(auth.config().authenticate()).get(routes_3.default.index);
        app.route('/api/posts/:id').all(auth.config().authenticate()).get(routes_3.default.findOne);
        app.route('/api/posts').all(auth.config().authenticate()).post(routes_3.default.create);
        app.route('/api/posts/:id').all(auth.config().authenticate()).put(routes_3.default.update);
        app.route('/api/posts/:id').all(auth.config().authenticate()).delete(routes_3.default.delete);
        app.route('/token').post(auth_1.default.auth);
    };
    return Routes;
}());
exports.default = new Routes();
