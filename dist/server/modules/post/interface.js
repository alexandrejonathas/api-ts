"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createPost(_a) {
    var id = _a.id, title = _a.title, text = _a.text, authorId = _a.authorId, author = _a.author;
    return {
        id: id, title: title, text: text, authorId: authorId, author: author
    };
}
exports.createPost = createPost;
function createPosts(data) {
    return data.map(createPost);
}
exports.createPosts = createPosts;
function createPostById(_a) {
    var id = _a.id, title = _a.title, text = _a.text, authorId = _a.authorId, author = _a.author;
    return {
        id: id, title: title, text: text, authorId: authorId, author: author
    };
}
exports.createPostById = createPostById;
