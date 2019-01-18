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
describe('Testes de integração', function () {
    'use strict';
    var config = require('../../server/config/env/config')();
    var id;
    var token;
    var userTest = {
        id: 100,
        name: 'User test',
        email: 'test@email.com',
        password: 'test'
    };
    var userDefault = {
        id: 1,
        name: 'Jonathas',
        email: 'jonathas@email.com',
        password: '123'
    };
    beforeEach(function (done) {
        models.sequelize.sync().then(function () {
            models.User.destroy({
                where: {}
            })
                .then(function () {
                return models.User.create(userDefault);
            })
                .then(function (user) {
                models.User.create(userTest)
                    .then(function () {
                    token = jwt.encode({ id: user.id }, config.secret);
                    done();
                });
            });
        });
    });
    describe('POST /token', function () {
        it('Deve receber um token', function (done) {
            var credentials = {
                email: userDefault.email,
                password: userDefault.password
            };
            helpers_1.request(helpers_1.app)
                .post('/token')
                .send(credentials)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.eql(HttpStatus.OK);
                helpers_1.expect(res.body.token).to.eql("" + token);
                done(error);
            });
        });
        it('Não deve gerar um token', function (done) {
            var credentials = {
                email: 'email.emailqualquer.com',
                password: 'senhaqualquer'
            };
            helpers_1.request(helpers_1.app)
                .post('/token')
                .send(credentials)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.eql(HttpStatus.UNAUTHORIZED);
                helpers_1.expect(res.body).to.empty;
                done(error);
            });
        });
    });
    describe('GET /api/users', function () {
        it('Deve retornar um json com todos os usuários', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/api/users')
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equals(HttpStatus.OK);
                helpers_1.expect(res.body.payload).to.be.an('array');
                helpers_1.expect(res.body.payload[0].name).to.equals(userDefault.name);
                helpers_1.expect(res.body.payload[0].email).to.equals(userDefault.email);
                done(error);
            });
        });
    });
    describe('POST /api/users', function () {
        it('Deve criar um usuário', function (done) {
            var user = {
                id: 2,
                name: "New user",
                email: 'newuser@email.com',
                password: 'newuser'
            };
            helpers_1.request(helpers_1.app)
                .post('/api/users')
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .send(user)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equals(HttpStatus.OK);
                helpers_1.expect(res.body.payload.id).to.equals(user.id);
                helpers_1.expect(res.body.payload.name).to.equals(user.name);
                helpers_1.expect(res.body.payload.email).to.equals(user.email);
                done(error);
            });
        });
    });
    describe('GET /api/users/:id', function () {
        it('Deve retornar um array com os dados de um usuário', function (done) {
            helpers_1.request(helpers_1.app)
                .get("/api/users/" + userDefault.id)
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equals(HttpStatus.OK);
                helpers_1.expect(res.body.payload.id).to.equals(userDefault.id);
                helpers_1.expect(res.body.payload).to.have.all.keys([
                    'email', 'id', 'name', 'password'
                ]);
                done(error);
            });
        });
    });
    describe('UPDATE /api/users/:id', function () {
        it('Deve atualizar os dados do usuário', function (done) {
            var user = {
                name: "Teste Update",
                email: 'update@email.com'
            };
            helpers_1.request(helpers_1.app)
                .put("/api/users/" + userDefault.id)
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .send(user)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equals(HttpStatus.OK);
                helpers_1.expect(res.body.payload[1][0].id).to.eql(userDefault.id);
                helpers_1.expect(res.body.payload[1][0].name).to.eql(user.name);
                helpers_1.expect(res.body.payload[1][0].email).to.eql(user.email);
                done(error);
            });
        });
    });
    describe('DELETE /api/users/:id', function () {
        it('Deve deletar um usuário pelo id', function (done) {
            helpers_1.request(helpers_1.app)
                .delete("/api/users/" + userDefault.id)
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equals(HttpStatus.OK);
                done(error);
            });
        });
    });
});
//# sourceMappingURL=integration.test.js.map