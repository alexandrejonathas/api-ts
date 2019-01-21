import { IAuthor } from '../author/interface';

export interface IPost {
    readonly id: number;
    title: string;
    text: string;
    authorId?: number;
    author?: IAuthor[];
}

export function createPost({id, title, text, authorId, author}: any){
    return {
        id, title, text, authorId, author
    }
}

export function createPosts(data: any[]): IPost[]{
    return data.map(createPost);
}

export function createPostById({id, title, text, authorId, author}: any): IPost {
    return {
        id, title, text, authorId, author
    }
}