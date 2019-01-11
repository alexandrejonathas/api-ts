import { testDouble, expect } from './config/helpers';
import ServiceUser from '../../server/modules/user/service';
import { doesNotReject } from 'assert';
const models = require('../../server/models');

describe('Testes Unitários do Controller', () =>{

    const user = {
        id: 1,
        name: 'New user',
        email: 'newuser@rmail.com',
        password: '1234'
    }      

    describe('Método Create', () => {
        it('Deve criar um novo usuário', () => {
            const service = new ServiceUser();
            return service.create(user)
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
            const service = new ServiceUser();
            return service.update(user.id, userUpdate)
                        .then(data => {
                            expect(data[0]).to.be.equal(1);
                        });
        });
    });

    describe('Método List', () => {
        it('Deve retornar uma lista com todos os usuário', () => {
            const service = new ServiceUser();
            return service.getAll()
                        .then(data => {
                            expect(data).to.be.an('array');                            
                            expect(data[0]).to.have.all.keys(
                                ['email', 'id', 'name', 'password' ]
                            );
                        });            
        });
    });

    describe('Método GetById', () => {
        it('Deve retornar os dados de um usuário pelo id', () => {
            const service = new ServiceUser();
            return service.getById(user.id)
                        .then(data => {                            
                            expect(data).to.have.all.keys(
                                ['email', 'id', 'name', 'password' ]
                            );
                        });            
        });
    });    

    describe('Método GetByEmail', () => {
        it('Deve retornar os dados de um usuário pelo email', () => {
            const service = new ServiceUser();
            return service.getByEmail('updateuser@email.com')
                        .then(data => {
                            console.log(data);                            
                            expect(data).to.have.all.keys(
                                ['email', 'id', 'name', 'password' ]
                            );
                        });            
        });
    });

    describe('Método Delete', () => {
        it('Deve deletar um usuário', () => {
            const service = new ServiceUser();
            return service.delete(1)
                        .then(data => {
                            expect(data).to.be.equal(1);
                        });
        });
    });            
});