"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = __importDefault(require("../../server/modules/user/service"));
var models = require('../../server/models');
describe('Testes Unitários do Controller', function () {
    var userDefault = {
        id: 1,
        name: 'Degault user',
        email: 'defaultuser@rmail.com',
        password: '1234'
    };
    beforeEach(function (done) {
        models.User.destroy({
            where: {}
        })
            .then(function () {
            models.User.create(userDefault)
                .then(function () {
                console.log('Usuário default criado com sucesso!');
                done();
            });
        });
    });
    describe('Método Create', function () {
        it('Deve criar um novo usuário', function () {
            var userDefault = {
                id: 2,
                name: 'New user',
                email: 'newuser@rmail.com',
                password: '1234'
            };
            return service_1.default.create(userDefault)
                .then(function (data) {
                helpers_1.expect(data.dataValues).to.have.all.keys(['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']);
            });
        });
    });
    describe('Método Update', function () {
        it('Deve atualizar um usuário', function () {
            var userUpdate = {
                name: 'Update user',
                email: 'updateuser@email.com',
                password: '12345'
            };
            return service_1.default.update(userDefault.id, userUpdate)
                .then(function (data) {
                helpers_1.expect(data[0]).to.be.equal(1);
            });
        });
    });
    describe('Método List', function () {
        it('Deve retornar uma lista com todos os usuário', function () {
            return service_1.default.getAll()
                .then(function (data) {
                helpers_1.expect(data).to.be.an('array');
            });
        });
    });
    describe('Método GetById', function () {
        it('Deve retornar os dados de um usuário pelo id', function () {
            return service_1.default.getById(userDefault.id)
                .then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    describe('Método GetByEmail', function () {
        it('Deve retornar os dados de um usuário pelo email', function () {
            return service_1.default.getByEmail(userDefault.email)
                .then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    describe('Método Delete', function () {
        it('Deve deletar um usuário', function () {
            return service_1.default.delete(userDefault.id)
                .then(function (data) {
                helpers_1.expect(data).to.be.equal(1);
            });
        });
    });
});
//# sourceMappingURL=unit.test.js.map