import {IAuthor, createAuthor, createAuthors, createAuthorById } from './interface';
import * as Bluebird from 'bluebird';
const models = require('../../models');

class Author implements IAuthor {
    
    public id: number;
    public name: string;
    public posts: [];
    
    constructor(){}

    create(author: any){
        return models.Author.create(author);
    }

    update(id: number, author: any){
        return models.Author.update(author, {
            where: {id},
            fields: ['name'],
            hooks: true,
            individualHooks: true
        });
    }

    delete(id: number){
        return models.Author.destroy({ where: { id } });
    }

    getAll(): Bluebird<IAuthor[]>{
        return models.Author.findAll({
            order: ['name'],
            include: [{ model: models.Post, as: 'posts' }]
        })
        .then(createAuthors);        
    }

    getById(id: number): Bluebird<IAuthor>{
        return models.Author.findOne({
            where: {id},
            include: [{ all: true }]
        })
        .then(createAuthorById);
    }
}

export default new Author();

