"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = require("./interface");
var models = require('../../models');
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.create = function (user) {
        return models.User.create(user);
    };
    User.prototype.update = function (id, user) {
        return models.User.update(user, {
            where: { id: id },
            fields: ['name', 'email', 'password'],
            hooks: true,
            individualHooks: true
        });
    };
    User.prototype.delete = function (id) {
        return models.User.destroy({ where: { id: id } });
    };
    User.prototype.getAll = function () {
        return models.User.findAll({ order: ['name'] })
            .then(interface_1.createUsers);
    };
    User.prototype.getById = function (id) {
        return models.User.findOne({ where: { id: id } })
            .then(interface_1.createUserById);
    };
    User.prototype.getByEmail = function (email) {
        return models.User.findOne({ where: { email: email } })
            .then(interface_1.createUserByEmail);
    };
    return User;
}());
exports.default = new User();
//# sourceMappingURL=service.js.map