import { Application, Request, Response } from 'express';
import userRoutes from '../../modules/user/routes';
import tokenRoutes from '../../modules/auth/auth';

class Routes {

    constructor(){}

    initRoutes(app: Application, auth: any): void {
        app.route('/api/users').all(auth.config().authenticate()).get(userRoutes.index);
        app.route('/api/users/:id').all(auth.config().authenticate()).get(userRoutes.findOne);
        app.route('/api/users').all(auth.config().authenticate()).post(userRoutes.create);
        app.route('/api/users/:id').all(auth.config().authenticate()).put(userRoutes.update);
        app.route('/api/users/:id').all(auth.config().authenticate()).delete(userRoutes.delete);
        app.route('/token').post(tokenRoutes.auth);
    }
}

export default new Routes();