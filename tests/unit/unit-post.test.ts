import { testDouble, expect } from './config/helpers';
import postService from '../../server/modules/post/service';
const models = require('../../server/models');

describe('Testes Unitários do Controller de Post', () =>{

    const authorDefault = {
        id: 1,
        name: 'Jonathas A. B. de Lima'
    }

    const postDefault = {
        id: 1,
        title: 'Primeiro post',
        text: 'Isso é um teste de postagem',
        authorId: authorDefault.id
    }    

    beforeEach(done => {
        models.Post.destroy({where: {}})
        .then(() => {
            models.Author.destroy({where: {}});
        })
        .then(() => {
            models.Author.create(authorDefault)
            .then(() => {
                models.Post.create(postDefault)
                .then(()=>{
                    console.log('Post default criado com sucesso!');
                    done();
                })
            })
        })
    })

    describe('Método Create', () => {
        it('Deve criar um novo post', () => {
            const post = {
                id: 2,
                title: 'Segundo post',
                text: 'Testando o segundo post',
                authorId: authorDefault.id
            }            
            return postService.create(post)
                    .then(data => {
                        expect(data.dataValues).to.have.all.keys(
                            ['id', 'title', 'text', 'authorId', 'updatedAt', 'createdAt' ]
                        );
                    });
        });
    });

    describe('Método Update', () => {
        it('Deve atualizar um post', () => {
            const post = {
                title: 'Segundo post',
                text: 'Testando o segundo post',
                authorId: authorDefault.id
            }
            return postService.update(postDefault.id, post)
                        .then(data => {
                            expect(data[0]).to.be.equal(1);
                        });
        });
    });

    describe('Método List', () => {
        it('Deve retornar uma lista com todos os posts', () => {            
            return postService.getAll()
                    .then(data => {
                        expect(data).to.be.an('array');                            
                    });            
        });
    });

    describe('Método GetById', () => {
        it('Deve retornar os dados de um post pelo id', () => {
            return postService.getById(postDefault.id)
                        .then(data => {                          
                            expect(data).to.have.all.keys(
                                ['author', 'authorId', 'id', 'title', 'text']
                            );
                        });            
        });
    });    

    describe('Método Delete', () => {
        it('Deve deletar um post', () => {
            return postService.delete(postDefault.id)
                        .then(data => {
                            expect(data).to.be.equal(1);
                        });
        });
    });            
});