import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { Application } from 'express';
import routes from './routes/routes';
import handler from './responses/handle';
import auth from '../auth';


class Api {

    public express: Application;

    constructor(){
        this.express = express();
        this.middleware();
    }

    middleware(): void {
        this.express.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            next();
        });        
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({"extended": true}));
        this.express.use(bodyParser.json());
        this.express.use(handler.errorHandlerApi);
        this.express.use(auth.config().initialize());
        this.router(this.express, auth);
    }

    private router(app: Application, auth: any): void {
        routes.initRoutes(app, auth);
    }
}

export default new Api().express;

