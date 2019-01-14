import { Request, Response } from 'express';
import userCtrl from './controller';


class UserRoutes {

    constructor(){}

    index(req: Request, res: Response){
        return userCtrl.getAll(req, res);
    }

    findOne(req: Request, res: Response){
        return userCtrl.findOne(req, res);
    }

    create(req: Request, res: Response){
        return userCtrl.create(req, res);
    }

    update(req: Request, res: Response){
        return userCtrl.update(req, res);
    }
    
    delete(req: Request, res: Response){
        return userCtrl.delete(req, res);
    }

}

export default new UserRoutes();