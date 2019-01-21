import { Request, Response } from 'express';
import postCtrl from './controller';


class PostRoutes {

    constructor(){}

    index(req: Request, res: Response){
        return postCtrl.getAll(req, res);
    }

    findOne(req: Request, res: Response){
        return postCtrl.findOne(req, res);
    }

    create(req: Request, res: Response){
        return postCtrl.create(req, res);
    }

    update(req: Request, res: Response){
        return postCtrl.update(req, res);
    }
    
    delete(req: Request, res: Response){
        return postCtrl.delete(req, res);
    }

}

export default new PostRoutes();