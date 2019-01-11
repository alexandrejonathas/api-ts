"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = __importDefault(require("../../server/modules/user/service"));
var models = require('../../server/models');
describe('Testes Unitários do Controller', function () {
    var user = {
        id: 1,
        name: 'New user',
        email: 'newuser@rmail.com',
        password: '1234'
    };
    describe('Método Create', function () {
        it('Deve criar um novo usuário', function () {
            var service = new service_1.default();
            return service.create(user)
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
            var service = new service_1.default();
            return service.update(user.id, userUpdate)
                .then(function (data) {
                helpers_1.expect(data[0]).to.be.equal(1);
            });
        });
    });
    describe('Método List', function () {
        it('Deve retornar uma lista com todos os usuário', function () {
            var service = new service_1.default();
            return service.getAll()
                .then(function (data) {
                helpers_1.expect(data).to.be.an('array');
                helpers_1.expect(data[0]).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    describe('Método GetById', function () {
        it('Deve retornar os dados de um usuário pelo id', function () {
            var service = new service_1.default();
            return service.getById(user.id)
                .then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    describe('Método GetByEmail', function () {
        it('Deve retornar os dados de um usuário pelo email', function () {
            var service = new service_1.default();
            return service.getByEmail('updateuser@email.com')
                .then(function (data) {
                console.log(data);
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    describe('Método Delete', function () {
        it('Deve deletar um usuário', function () {
            var service = new service_1.default();
            return service.delete(1)
                .then(function (data) {
                helpers_1.expect(data).to.be.equal(1);
            });
        });
    });
});
//# sourceMappingURL=unit.test.js.map