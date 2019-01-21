import {IPost, createPost, createPosts, createPostById } from './interface';
import * as Bluebird from 'bluebird';
import { IAuthor } from '../author/interface';
const models = require('../../models');

class Post implements IPost {
    
    public id: number;
    public title: string;
    public text: string;
    public authorId?: number;
    public Author?: IAuthor[];
    
    constructor(){}

    create(post: any){
        return models.Post.create(post);
    }

    update(id: number, post: any){
        return models.Post.update(post, {
            where: {id},
            fields: ['title', 'text', 'authorId'],
            hooks: true,
            individualHooks: true
        });
    }

    delete(id: number){
        return models.Post.destroy({ where: { id } });
    }

    getAll(): Bluebird<IPost[]>{
        return models.Post.findAll({
            order: ['title'],
            include: [{ all: true }]
        })
        .then(createPosts);        
    }

    getById(id: number): Bluebird<IPost>{
        return models.Post.findOne({
            where: {id},
            include: [{ all: true }]
        })
        .then(createPostById);
    }
}

export default new Post();

