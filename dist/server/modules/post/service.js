"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = require("./interface");
var models = require('../../models');
var Post = /** @class */ (function () {
    function Post() {
    }
    Post.prototype.create = function (post) {
        return models.Post.create(post);
    };
    Post.prototype.update = function (id, post) {
        return models.Post.update(post, {
            where: { id: id },
            fields: ['title', 'text', 'authorId'],
            hooks: true,
            individualHooks: true
        });
    };
    Post.prototype.delete = function (id) {
        return models.Post.destroy({ where: { id: id } });
    };
    Post.prototype.getAll = function () {
        return models.Post.findAll({
            order: ['title'],
            include: [{ all: true }]
        })
            .then(interface_1.createPosts);
    };
    Post.prototype.getById = function (id) {
        return models.Post.findOne({
            where: { id: id },
            include: [{ all: true }]
        })
            .then(interface_1.createPostById);
    };
    return Post;
}());
exports.default = new Post();
