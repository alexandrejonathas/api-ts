import { Application, Request, Response } from 'express';
import UserRoutes from '../../modules/user/routes';
import TokenRoutes from '../../modules/auth/auth';

class Routes {

    private userRoutes: UserRoutes;
    private tokenRoutes: TokenRoutes;
    private auth: any;

    constructor(app: Application, auth: any){
        this.userRoutes = new UserRoutes();
        this.tokenRoutes = new TokenRoutes();
        this.auth = auth;
        this.getRoutes(app);
    }

    getRoutes(app: Application): void {
        app.route('/api/users').all(this.auth.authenticate()).get(this.userRoutes.index);
        app.route('/api/users/:id').all(this.auth.authenticate()).get(this.userRoutes.findOne);
        app.route('/api/users').all(this.auth.authenticate()).post(this.userRoutes.create);
        app.route('/api/users/:id').all(this.auth.authenticate()).put(this.userRoutes.update);
        app.route('/api/users/:id').all(this.auth.authenticate()).delete(this.userRoutes.delete);
        app.route('/token').post(this.tokenRoutes.auth);
    }
}

export default Routes;