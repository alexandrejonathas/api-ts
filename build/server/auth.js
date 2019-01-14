"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import * as passport from 'passport';
var passport = require('passport');
var passport_jwt_1 = require("passport-jwt");
var service_1 = __importDefault(require("./modules/user/service"));
var config = require('./config/env/config')();
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.prototype.config = function () {
        var opts = {
            secretOrKey: config.secret,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()
        };
        passport.use(new passport_jwt_1.Strategy(opts, function (jwtPayload, done) {
            service_1.default.getById(jwtPayload.id)
                .then(function (user) {
                if (user) {
                    return done(null, {
                        id: user.id,
                        email: user.email
                    });
                }
                return done(null, false);
            })
                .catch(function (error) {
                done(error, null);
            });
        }));
        return {
            initialize: function () { return passport.initialize(); },
            authenticate: function () { return passport.authenticate('jwt', { session: false }); }
        };
    };
    return Auth;
}());
exports.default = new Auth();
//# sourceMappingURL=auth.js.map