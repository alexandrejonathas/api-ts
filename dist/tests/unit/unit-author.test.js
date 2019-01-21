"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = __importDefault(require("../../server/modules/author/service"));
var models = require('../../server/models');
describe('Testes Unitários do Controller do Autor', function () {
    var authorDefault = {
        id: 1,
        name: 'Default author'
    };
    beforeEach(function (done) {
        models.Author.destroy({ where: {} })
            .then(function () {
            models.Author.create(authorDefault)
                .then(function () {
                console.log('Autor default criado com sucesso!');
                done();
            });
        });
    });
    describe('Método Create', function () {
        it('Deve criar um novo autor', function () {
            var author = {
                id: 2,
                name: 'New Autor'
            };
            return service_1.default.create(author)
                .then(function (data) {
                helpers_1.expect(data.dataValues).to.have.all.keys(['id', 'name', 'updatedAt', 'createdAt']);
            });
        });
    });
    describe('Método Update', function () {
        it('Deve atualizar um author', function () {
            var authorUpdate = {
                name: 'Update author'
            };
            return service_1.default.update(authorDefault.id, authorUpdate)
                .then(function (data) {
                helpers_1.expect(data[0]).to.be.equal(1);
            });
        });
    });
    describe('Método List', function () {
        it('Deve retornar uma lista com todos os autores', function () {
            return service_1.default.getAll()
                .then(function (data) {
                helpers_1.expect(data).to.be.an('array');
            });
        });
    });
    describe('Método GetById', function () {
        it('Deve retornar os dados de um author pelo id', function () {
            return service_1.default.getById(authorDefault.id)
                .then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['id', 'name', 'posts']);
            });
        });
    });
    describe('Método Delete', function () {
        it('Deve deletar um author', function () {
            return service_1.default.delete(authorDefault.id)
                .then(function (data) {
                helpers_1.expect(data).to.be.equal(1);
            });
        });
    });
});
