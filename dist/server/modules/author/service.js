"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = require("./interface");
var models = require('../../models');
var Author = /** @class */ (function () {
    function Author() {
    }
    Author.prototype.create = function (author) {
        return models.Author.create(author);
    };
    Author.prototype.update = function (id, author) {
        return models.Author.update(author, {
            where: { id: id },
            fields: ['name'],
            hooks: true,
            individualHooks: true
        });
    };
    Author.prototype.delete = function (id) {
        return models.Author.destroy({ where: { id: id } });
    };
    Author.prototype.getAll = function () {
        return models.Author.findAll({
            order: ['name'],
            include: [{ model: models.Post, as: 'posts' }]
        })
            .then(interface_1.createAuthors);
    };
    Author.prototype.getById = function (id) {
        return models.Author.findOne({
            where: { id: id },
            include: [{ all: true }]
        })
            .then(interface_1.createAuthorById);
    };
    return Author;
}());
exports.default = new Author();
