"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = __importDefault(require("../../server/modules/post/service"));
var models = require('../../server/models');
describe('Testes Unitários do Controller de Post', function () {
    var authorDefault = {
        id: 1,
        name: 'Jonathas A. B. de Lima'
    };
    var postDefault = {
        id: 1,
        title: 'Primeiro post',
        text: 'Isso é um teste de postagem',
        authorId: authorDefault.id
    };
    beforeEach(function (done) {
        models.Post.destroy({ where: {} })
            .then(function () {
            models.Author.destroy({ where: {} });
        })
            .then(function () {
            models.Author.create(authorDefault)
                .then(function () {
                models.Post.create(postDefault)
                    .then(function () {
                    console.log('Post default criado com sucesso!');
                    done();
                });
            });
        });
    });
    describe('Método Create', function () {
        it('Deve criar um novo post', function () {
            var post = {
                id: 2,
                title: 'Segundo post',
                text: 'Testando o segundo post',
                authorId: authorDefault.id
            };
            return service_1.default.create(post)
                .then(function (data) {
                helpers_1.expect(data.dataValues).to.have.all.keys(['id', 'title', 'text', 'authorId', 'updatedAt', 'createdAt']);
            });
        });
    });
    describe('Método Update', function () {
        it('Deve atualizar um post', function () {
            var post = {
                title: 'Segundo post',
                text: 'Testando o segundo post',
                authorId: authorDefault.id
            };
            return service_1.default.update(postDefault.id, post)
                .then(function (data) {
                helpers_1.expect(data[0]).to.be.equal(1);
            });
        });
    });
    describe('Método List', function () {
        it('Deve retornar uma lista com todos os posts', function () {
            return service_1.default.getAll()
                .then(function (data) {
                helpers_1.expect(data).to.be.an('array');
            });
        });
    });
    describe('Método GetById', function () {
        it('Deve retornar os dados de um post pelo id', function () {
            return service_1.default.getById(postDefault.id)
                .then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['author', 'authorId', 'id', 'title', 'text']);
            });
        });
    });
    describe('Método Delete', function () {
        it('Deve deletar um post', function () {
            return service_1.default.delete(postDefault.id)
                .then(function (data) {
                helpers_1.expect(data).to.be.equal(1);
            });
        });
    });
});
