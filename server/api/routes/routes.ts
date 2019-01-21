import { Application, Request, Response } from 'express';
import tokenRoutes from '../../modules/auth/auth';
import userRoutes from '../../modules/user/routes';
import authorRoutes from '../../modules/author/routes';
import postRoutes from '../../modules/post/routes';

class Routes {

    constructor(){}

    initRoutes(app: Application, auth: any): void {
        app.route('/api/users').all(auth.config().authenticate()).get(userRoutes.index);
        app.route('/api/users/:id').all(auth.config().authenticate()).get(userRoutes.findOne);
        app.route('/api/users').all(auth.config().authenticate()).post(userRoutes.create);
        app.route('/api/users/:id').all(auth.config().authenticate()).put(userRoutes.update);
        app.route('/api/users/:id').all(auth.config().authenticate()).delete(userRoutes.delete);

        app.route('/api/authors').all(auth.config().authenticate()).get(authorRoutes.index);
        app.route('/api/authors/:id').all(auth.config().authenticate()).get(authorRoutes.findOne);
        app.route('/api/authors').all(auth.config().authenticate()).post(authorRoutes.create);
        app.route('/api/authors/:id').all(auth.config().authenticate()).put(authorRoutes.update);
        app.route('/api/authors/:id').all(auth.config().authenticate()).delete(authorRoutes.delete);

        app.route('/api/posts').all(auth.config().authenticate()).get(postRoutes.index);
        app.route('/api/posts/:id').all(auth.config().authenticate()).get(postRoutes.findOne);
        app.route('/api/posts').all(auth.config().authenticate()).post(postRoutes.create);
        app.route('/api/posts/:id').all(auth.config().authenticate()).put(postRoutes.update);
        app.route('/api/posts/:id').all(auth.config().authenticate()).delete(postRoutes.delete);


        app.route('/token').post(tokenRoutes.auth);
    }
}

export default new Routes();