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
describe('Testes de integração do modulo Author', function () {
    'use strict';
    var config = require('../../server/config/env/config')();
    var token;
    var userDefault = {
        id: 1,
        name: 'Jonathas',
        email: 'jonathas@email.com',
        password: '123'
    };
    var authorTest = {
        id: 100,
        name: 'Bruno Lopez'
    };
    var authorDefault = {
        id: 1,
        name: 'Alberto Munhoz'
    };
    beforeEach(function (done) {
        models.sequelize.sync().then(function () {
            models.User.destroy({ where: {} })
                .then(function () {
                models.Author.destroy({
                    where: {}
                });
            })
                .then(function () {
                return models.Author.create(authorDefault);
            })
                .then(function (author) {
                models.Author.create(authorTest)
                    .then(function () {
                    models.User.create(userDefault)
                        .then(function (user) {
                        token = jwt.encode({ id: userDefault.id }, config.secret);
                        done();
                    });
                });
            });
        });
    });
    describe('GET /api/authors', function () {
        it('Deve retornar um json com todos os autores', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/api/authors')
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equals(HttpStatus.OK);
                helpers_1.expect(res.body.payload).to.be.an('array');
                helpers_1.expect(res.body.payload[0].name).to.equals(authorDefault.name);
                done(error);
            });
        });
    });
    describe('POST /api/authors', function () {
        it('Deve criar um autor', function (done) {
            var author = {
                id: 2,
                name: "Carlos Ricoh"
            };
            helpers_1.request(helpers_1.app)
                .post('/api/authors')
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .send(author)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equals(HttpStatus.OK);
                helpers_1.expect(res.body.payload.id).to.equals(author.id);
                helpers_1.expect(res.body.payload.name).to.equals(author.name);
                done(error);
            });
        });
    });
    describe('GET /api/authors/:id', function () {
        it('Deve retornar um array com os dados de um autor', function (done) {
            helpers_1.request(helpers_1.app)
                .get("/api/authors/" + authorDefault.id)
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equals(HttpStatus.OK);
                helpers_1.expect(res.body.payload.id).to.equals(authorDefault.id);
                helpers_1.expect(res.body.payload).to.have.all.keys([
                    'id', 'name', 'posts'
                ]);
                done(error);
            });
        });
    });
    describe('UPDATE /api/authors/:id', function () {
        it('Deve atualizar os dados do autor', function (done) {
            var author = {
                name: "Autor Atualizado"
            };
            helpers_1.request(helpers_1.app)
                .put("/api/authors/" + authorDefault.id)
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .send(author)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equals(HttpStatus.OK);
                helpers_1.expect(res.body.payload[1][0].id).to.eql(authorDefault.id);
                helpers_1.expect(res.body.payload[1][0].name).to.eql(author.name);
                done(error);
            });
        });
    });
    describe('DELETE /api/authors/:id', function () {
        it('Deve deletar um autor pelo id', function (done) {
            helpers_1.request(helpers_1.app)
                .delete("/api/authors/" + authorDefault.id)
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equals(HttpStatus.OK);
                done(error);
            });
        });
    });
});
