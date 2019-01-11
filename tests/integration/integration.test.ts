import * as jwt from 'jwt-simple';
import { app, request, expect } from './config/helpers';
import * as HttpStatus from 'http-status';
const models = require('../../server/models');

describe('Testes de integração', () => {

    'use strict';
    const config = require('../../server/config/env/config')();

    let id: number;
    let token: any;

    const userTest = {
        id: 100,
        name: 'User test',
        email: 'test@email.com',
        password: 'test'
    };

    const userDefault = {
        id: 1,
        name: 'Jonathas',
        email: 'jonathas@email.com',
        password: '123'
    };   

    beforeEach(done => {
        models.sequelize.sync().then(()=>{
            models.User.destroy({
                where: {}
            })
            .then(() => {
                return models.User.create(userDefault);
            })
            .then(user => {
                 models.User.create(userTest)
                 .then(()=>{
                     token = jwt.encode({ id: user.id}, config.secret);
                     done();
                 });
            }); 
        });
    });

    describe('POST /token', () => {
        it('Deve receber um token', done => {
            const credentials = {
                email: userDefault.email,
                password: userDefault.password
            }
            request(app)
            .post('/token')
            .send(credentials)
            .end((error, res) => {
                expect(res.status).to.eql(HttpStatus.OK);
                expect(res.body.token).to.eql(`${token}`);
                done(error);
            })
        });

        it('Não deve gerar um token', done => {
            const credentials = {
                email: 'email.emailqualquer.com',
                password: 'senhaqualquer'
            }
            request(app)
            .post('/token')
            .send(credentials)
            .end((error, res) => {
                expect(res.status).to.eql(HttpStatus.UNAUTHORIZED);
                expect(res.body).to.empty;
                done(error);
            })
        });        
    });
    
    describe('GET /api/users', () => {
        it('Deve retornar um json com todos os usuários', done => {
            request(app)
            .get('/api/users')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)            
            .end((error:any, res: any) => {
                expect(res.status).to.equals(HttpStatus.OK);
                expect(res.body.payload).to.be.an('array');
                expect(res.body.payload[0].name).to.equals(userDefault.name);
                expect(res.body.payload[0].email).to.equals(userDefault.email);
                done(error);
            });
        });
    });    


    describe('POST /api/users', () => {
        it('Deve criar um usuário', done => {
            const user = { 
                id: 2,
                name: "New user",
                email: 'newuser@email.com',
                password: 'newuser' 
            };
            request(app)
            .post('/api/users')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)                
            .send(user)
            .end((error, res) => {
                expect(res.status).to.equals(HttpStatus.OK);
                expect(res.body.payload.id).to.equals(user.id);
                expect(res.body.payload.name).to.equals(user.name);
                expect(res.body.payload.email).to.equals(user.email);
                done(error);
            });
        });
    });
    
    describe('GET /api/users/:id', () => {
        it('Deve retornar um array com os dados de um usuário', done => {
            request(app)
            .get(`/api/users/${userDefault.id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)            
            .end((error, res) => {
                expect(res.status).to.equals(HttpStatus.OK);
                expect(res.body.payload.id).to.equals(userDefault.id);
                expect(res.body.payload).to.have.all.keys([
                    'email', 'id', 'name', 'password'
                ]);
                done(error);
            });
        });
    });       

    describe('UPDATE /api/users/:id', () => {
        it('Deve atualizar os dados do usuário', done => {
            const user = { 
                name: "Teste Update",
                email: 'update@email.com'                
             };
            request(app)
            .put(`/api/users/${userDefault.id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)    
            .send(user)
            .end((error, res) => {
                expect(res.status).to.equals(HttpStatus.OK);
                expect(res.body.payload[1][0].id).to.eql(userDefault.id);
                expect(res.body.payload[1][0].name).to.eql(user.name);
                expect(res.body.payload[1][0].email).to.eql(user.email);
                done(error);
            });
        });
    });

    describe('DELETE /api/users/:id', () => {
        it('Deve deletar um usuário pelo id', done => {
            request(app)
            .delete(`/api/users/${userDefault.id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)                
            .end((error, res) => {
                expect(res.status).to.equals(HttpStatus.OK);
                done(error);
            });
        });
    });        

});