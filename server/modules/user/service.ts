import {IUser, IUserDetail, createUser, createUsers, createUserById, createUserByEmail} from './interface';
import * as Bluebird from 'bluebird';
const models = require('../../models');

class User implements IUser {
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    
    constructor(){}

    create(user: any){
        return models.User.create(user);
    }

    update(id: number, user: any){
        return models.User.update(user, {
            where: {id},
            fields: ['name', 'email', 'password'],
            hooks: true,
            individualHooks: true
        });
    }

    delete(id: number){
        return models.User.destroy({ where: { id } });
    }

    getAll(): Bluebird<IUser[]>{
        return models.User.findAll({order: ['name']})
        .then(createUsers);
    }

    getById(id: number): Bluebird<IUserDetail>{
        return models.User.findOne({where: {id}})
        .then(createUserById);
    }

    getByEmail(email: string): Bluebird<IUserDetail>{
        return models.User.findOne({where: {email}})
        .then(createUserByEmail);        
    }
}

export default new User();

