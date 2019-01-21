"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createAuthor(_a) {
    var id = _a.id, name = _a.name, posts = _a.posts;
    return {
        id: id, name: name, posts: posts
    };
}
exports.createAuthor = createAuthor;
function createAuthors(data) {
    return data.map(createAuthor);
}
exports.createAuthors = createAuthors;
function createAuthorById(_a) {
    var id = _a.id, name = _a.name, posts = _a.posts;
    return {
        id: id, name: name, posts: posts
    };
}
exports.createAuthorById = createAuthorById;
