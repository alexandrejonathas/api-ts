import { Request, Response } from 'express';
import authorCtrl from './controller';


class AuthorRoutes {

    constructor(){}

    index(req: Request, res: Response){
        return authorCtrl.getAll(req, res);
    }

    findOne(req: Request, res: Response){
        return authorCtrl.findOne(req, res);
    }

    create(req: Request, res: Response){
        return authorCtrl.create(req, res);
    }

    update(req: Request, res: Response){
        return authorCtrl.update(req, res);
    }
    
    delete(req: Request, res: Response){
        return authorCtrl.delete(req, res);
    }

}

export default new AuthorRoutes();