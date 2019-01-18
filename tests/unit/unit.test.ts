import { testDouble, expect } from './config/helpers';
import userService from '../../server/modules/user/service';
import { doesNotReject } from 'assert';
const models = require('../../server/models');

describe('Testes Unitários do Controller', () =>{

    const userDefault = {
        id: 1,
        name: 'Degault user',
        email: 'defaultuser@rmail.com',
        password: '1234'
    }
    
    beforeEach(done => {
        models.User.destroy({
            where: {}
        })
        .then(() => {
            models.User.create(userDefault)
            .then(()=>{
                console.log('Usuário default criado com sucesso!');
                done();
            })
        })
    })

    describe('Método Create', () => {
        it('Deve criar um novo usuário', () => {
            const userDefault = {
                id: 2,
                name: 'New user',
                email: 'newuser@rmail.com',
                password: '1234'
            }            
            return userService.create(userDefault)
                    .then(data => {
                        expect(data.dataValues).to.have.all.keys(
                            ['email', 'id', 'name', 'password', 'updatedAt', 'createdAt' ]
                        );
                    });
        });
    });

    describe('Método Update', () => {
        it('Deve atualizar um usuário', () => {
            const userUpdate = {
                name: 'Update user',
                email: 'updateuser@email.com',
                password: '12345'
            }
            return userService.update(userDefault.id, userUpdate)
                        .then(data => {
                            expect(data[0]).to.be.equal(1);
                        });
        });
    });

    describe('Método List', () => {
        it('Deve retornar uma lista com todos os usuário', () => {            
            return userService.getAll()
                    .then(data => {
                        expect(data).to.be.an('array');                            
                    });            
        });
    });

    describe('Método GetById', () => {
        it('Deve retornar os dados de um usuário pelo id', () => {
            return userService.getById(userDefault.id)
                        .then(data => {                            
                            expect(data).to.have.all.keys(
                                ['email', 'id', 'name', 'password' ]
                            );
                        });            
        });
    });    

    describe('Método GetByEmail', () => {
        it('Deve retornar os dados de um usuário pelo email', () => {
            return userService.getByEmail(userDefault.email)
                        .then(data => {                           
                            expect(data).to.have.all.keys(
                                ['email', 'id', 'name', 'password' ]
                            );
                        });            
        });
    });

    describe('Método Delete', () => {
        it('Deve deletar um usuário', () => {
            return userService.delete(userDefault.id)
                        .then(data => {
                            expect(data).to.be.equal(1);
                        });
        });
    });            
});