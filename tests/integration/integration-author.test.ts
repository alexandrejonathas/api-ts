import * as jwt from 'jwt-simple';
import { app, request, expect } from './config/helpers';
import * as HttpStatus from 'http-status';
const models = require('../../server/models');

describe('Testes de integração do modulo Author', () => {

    'use strict';
    const config = require('../../server/config/env/config')();

    let token: any;

    const userDefault = {
        id: 1,
        name: 'Jonathas',
        email: 'jonathas@email.com',
        password: '123'
    }; 

    const authorTest = {
        id: 100,
        name: 'Bruno Lopez'
    };

    const authorDefault = {
        id: 1,
        name: 'Alberto Munhoz'
    };   

    beforeEach(done => {
        models.sequelize.sync().then(()=>{
            models.User.destroy({where: {}})
            .then(() => {
                models.Author.destroy({
                    where: {}
                })
            })
            .then(() => {
                return models.Author.create(authorDefault);
            })
            .then(author => {
                 models.Author.create(authorTest)
                 .then(()=>{
                     models.User.create(userDefault)
                     .then(user => {
                         token = jwt.encode({ id: userDefault.id}, config.secret);
                         done();
                     })
                 });
            }); 
        });
    });

    describe('GET /api/authors', () => {
        it('Deve retornar um json com todos os autores', done => {
            request(app)
            .get('/api/authors')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)            
            .end((error:any, res: any) => {
                expect(res.status).to.equals(HttpStatus.OK);
                expect(res.body.payload).to.be.an('array');
                expect(res.body.payload[0].name).to.equals(authorDefault.name);
                done(error);
            });
        });
    });    


    describe('POST /api/authors', () => {
        it('Deve criar um autor', done => {
            const author = { 
                id: 2,
                name: "Carlos Ricoh" 
            };
            request(app)
            .post('/api/authors')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)                
            .send(author)
            .end((error, res) => {
                expect(res.status).to.equals(HttpStatus.OK);
                expect(res.body.payload.id).to.equals(author.id);
                expect(res.body.payload.name).to.equals(author.name);
                done(error);
            });
        });
    });
    
    describe('GET /api/authors/:id', () => {
        it('Deve retornar um array com os dados de um autor', done => {
            request(app)
            .get(`/api/authors/${authorDefault.id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)            
            .end((error, res) => {
                expect(res.status).to.equals(HttpStatus.OK);
                expect(res.body.payload.id).to.equals(authorDefault.id);
                expect(res.body.payload).to.have.all.keys([
                    'id', 'name'
                ]);
                done(error);
            });
        });
    });       

    describe('UPDATE /api/authors/:id', () => {
        it('Deve atualizar os dados do autor', done => {
            const author = { 
                name: "Autor Atualizado"                
             };
            request(app)
            .put(`/api/authors/${authorDefault.id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)    
            .send(author)
            .end((error, res) => {
                expect(res.status).to.equals(HttpStatus.OK);
                expect(res.body.payload[1][0].id).to.eql(authorDefault.id);
                expect(res.body.payload[1][0].name).to.eql(author.name);
                done(error);
            });
        });
    });

    describe('DELETE /api/authors/:id', () => {
        it('Deve deletar um autor pelo id', done => {
            request(app)
            .delete(`/api/authors/${authorDefault.id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)                
            .end((error, res) => {
                expect(res.status).to.equals(HttpStatus.OK);
                done(error);
            });
        });
    });

});