"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = __importStar(require("jwt-simple"));
var helpers_1 = require("./config/helpers");
var HttpStatus = __importStar(require("http-status"));
var models = require('../../server/models');
describe('Testes de integração do modulo Post', function () {
    'use strict';
    var config = require('../../server/config/env/config')();
    var token;
    var userDefault = {
        id: 1,
        name: 'Jonathas',
        email: 'jonathas@email.com',
        password: '123'
    };
    var authorDefault = {
        id: 1,
        name: 'Alberto Munhoz'
    };
    var postDefault = {
        id: 1,
        title: 'Primeiro post',
        text: 'Texto do primeiro post',
        authorId: userDefault.id
    };
    beforeEach(function (done) {
        models.sequelize.sync().then(function () {
            models.Post.destroy({ where: {} })
                .then(function () {
                models.Author.destroy({
                    where: {}
                });
            })
                .then(function () {
                return models.User.destroy({ where: {} });
            })
                .then(function () {
                return models.User.create(userDefault);
            })
                .then(function () {
                return models.Author.create(authorDefault);
            })
                .then(function (author) {
                models.Post.create(postDefault)
                    .then(function () {
                    token = jwt.encode({ id: userDefault.id }, config.secret);
                    done();
                });
            });
        });
    });
    describe('GET /api/posts', function () {
        it('Deve retornar um json com todos os posts', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/api/posts')
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equals(HttpStatus.OK);
                helpers_1.expect(res.body.payload).to.be.an('array');
                helpers_1.expect(res.body.payload[0].title).to.equals(postDefault.title);
                done(error);
            });
        });
    });
    describe('POST /api/posts', function () {
        it('Deve criar um post', function (done) {
            var post = {
                id: 2,
                title: 'Segundo post',
                text: 'Texto do segundo post',
                authorId: authorDefault.id
            };
            helpers_1.request(helpers_1.app)
                .post('/api/posts')
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .send(post)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equals(HttpStatus.OK);
                helpers_1.expect(res.body.payload.id).to.equals(post.id);
                helpers_1.expect(res.body.payload.title).to.equals(post.title);
                done(error);
            });
        });
    });
    describe('GET /api/posts/:id', function () {
        it('Deve retornar um array com os dados de um post', function (done) {
            helpers_1.request(helpers_1.app)
                .get("/api/posts/" + postDefault.id)
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equals(HttpStatus.OK);
                helpers_1.expect(res.body.payload.id).to.equals(postDefault.id);
                helpers_1.expect(res.body.payload).to.have.all.keys([
                    'author', 'authorId', 'id', 'title', 'text'
                ]);
                done(error);
            });
        });
    });
    describe('UPDATE /api/posts/:id', function () {
        it('Deve atualizar os dados do post', function (done) {
            var post = {
                title: 'Post Atualizado',
                text: 'Texto Atualizado'
            };
            helpers_1.request(helpers_1.app)
                .put("/api/posts/" + postDefault.id)
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .send(post)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equals(HttpStatus.OK);
                helpers_1.expect(res.body.payload[1][0].id).to.eql(postDefault.id);
                helpers_1.expect(res.body.payload[1][0].title).to.eql(post.title);
                helpers_1.expect(res.body.payload[1][0].text).to.eql(post.text);
                done(error);
            });
        });
    });
    describe('DELETE /api/posts/:id', function () {
        it('Deve deletar um post pelo id', function (done) {
            helpers_1.request(helpers_1.app)
                .delete("/api/posts/" + postDefault.id)
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equals(HttpStatus.OK);
                done(error);
            });
        });
    });
});
