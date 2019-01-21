import * as jwt from 'jwt-simple';
import { app, request, expect } from './config/helpers';
import * as HttpStatus from 'http-status';
const models = require('../../server/models');

describe('Testes de integração do modulo Post', () => {

    'use strict';
    const config = require('../../server/config/env/config')();

    let token: any;

    const userDefault = {
        id: 1,
        name: 'Jonathas',
        email: 'jonathas@email.com',
        password: '123'
    }; 

    const authorDefault = {
        id: 1,
        name: 'Alberto Munhoz'
    };
    
    const postDefault = {
        id: 1,
        title: 'Primeiro post',
        text: 'Texto do primeiro post',
        authorId: userDefault.id
    }

    beforeEach(done => {
        models.sequelize.sync().then(()=>{
            models.Post.destroy({where: {}})
            .then(() => {
                models.Author.destroy({
                    where: {}
                })
            })
            .then(() =>{
                return models.User.destroy({ where: {}});
            })            
            .then(() => {
                return models.User.create(userDefault);
            })
            .then(() => {
                return models.Author.create(authorDefault);
            })
            .then(author => {
                 models.Post.create(postDefault)
                 .then(()=>{
                    token = jwt.encode({ id: userDefault.id}, config.secret);
                    done();                     
                 });
            }); 
        });
    });

    describe('GET /api/posts', () => {
        it('Deve retornar um json com todos os posts', done => {
            request(app)
            .get('/api/posts')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)            
            .end((error:any, res: any) => {
                expect(res.status).to.equals(HttpStatus.OK);
                expect(res.body.payload).to.be.an('array');
                expect(res.body.payload[0].title).to.equals(postDefault.title);
                done(error);
            });
        });
    });    


    describe('POST /api/posts', () => {
        it('Deve criar um post', done => {
            const post = { 
                id: 2,
                title: 'Segundo post',
                text: 'Texto do segundo post',
                authorId: authorDefault.id 
            };
            request(app)
            .post('/api/posts')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)                
            .send(post)
            .end((error, res) => {
                expect(res.status).to.equals(HttpStatus.OK);
                expect(res.body.payload.id).to.equals(post.id);
                expect(res.body.payload.title).to.equals(post.title);
                done(error);
            });
        });
    });
    
    describe('GET /api/posts/:id', () => {
        it('Deve retornar um array com os dados de um post', done => {
            request(app)
            .get(`/api/posts/${postDefault.id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)            
            .end((error, res) => {
                expect(res.status).to.equals(HttpStatus.OK);
                expect(res.body.payload.id).to.equals(postDefault.id);
                expect(res.body.payload).to.have.all.keys([
                    'author', 'authorId', 'id', 'title', 'text'
                ]);
                done(error);
            });
        });
    });       

    describe('UPDATE /api/posts/:id', () => {
        it('Deve atualizar os dados do post', done => {
            const post = { 
                title: 'Post Atualizado',
                text: 'Texto Atualizado'                
             };
            request(app)
            .put(`/api/posts/${postDefault.id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)    
            .send(post)
            .end((error, res) => {
                expect(res.status).to.equals(HttpStatus.OK);
                expect(res.body.payload[1][0].id).to.eql(postDefault.id);
                expect(res.body.payload[1][0].title).to.eql(post.title);
                expect(res.body.payload[1][0].text).to.eql(post.text);
                expect(res.body.payload[1][0].authorId).to.eql(authorDefault.id);
                done(error);
            });
        });
    });

    describe('DELETE /api/posts/:id', () => {
        it('Deve deletar um post pelo id', done => {
            request(app)
            .delete(`/api/posts/${postDefault.id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)                
            .end((error, res) => {
                expect(res.status).to.equals(HttpStatus.OK);
                done(error);
            });
        });
    });

});