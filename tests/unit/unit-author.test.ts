import { testDouble, expect } from './config/helpers';
import authorService from '../../server/modules/author/service';
const models = require('../../server/models');

describe('Testes Unitários do Controller do Autor', () =>{

    const authorDefault = {
        id: 1,
        name: 'Default author'
    }
    
    beforeEach(done => {
        models.Author.destroy({where: {}})
        .then(() => {
            models.Author.create(authorDefault)
            .then(()=>{
                console.log('Autor default criado com sucesso!');
                done();
            })
        })
    })

    describe('Método Create', () => {
        it('Deve criar um novo autor', () => {
            const author = {
                id: 2,
                name: 'New Autor'
            }            
            return authorService.create(author)
                    .then(data => {
                        expect(data.dataValues).to.have.all.keys(
                            ['id', 'name', 'updatedAt', 'createdAt' ]
                        );
                    });
        });
    });

    describe('Método Update', () => {
        it('Deve atualizar um author', () => {
            const authorUpdate = {
                name: 'Update author'
            }
            return authorService.update(authorDefault.id, authorUpdate)
                        .then(data => {
                            expect(data[0]).to.be.equal(1);
                        });
        });
    });

    describe('Método List', () => {
        it('Deve retornar uma lista com todos os autores', () => {            
            return authorService.getAll()
                    .then(data => {
                        expect(data).to.be.an('array');                            
                    });            
        });
    });

    describe('Método GetById', () => {
        it('Deve retornar os dados de um author pelo id', () => {
            return authorService.getById(authorDefault.id)
                        .then(data => {                            
                            expect(data).to.have.all.keys(
                                ['id', 'name', 'posts']
                            );
                        });            
        });
    });    

    describe('Método Delete', () => {
        it('Deve deletar um author', () => {
            return authorService.delete(authorDefault.id)
                        .then(data => {
                            expect(data).to.be.equal(1);
                        });
        });
    });            
});