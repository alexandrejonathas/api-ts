import { Request, Response } from 'express';
import * as HttpStatus from 'http-status';
import * as _ from 'lodash';
import userService from './service';
import handle from '../../api/responses/handle';

class UserController {

    constructor(){}

    getAll(req: Request, res: Response){
        userService.getAll()
        .then(_.partial(handle.onSuccess, res))
        .catch(_.partial(handle.onError, res, 'Ocorreu um erro ao buscar todos os usuários!'));
    }

    findOne(req: Request, res: Response){
        let id = parseInt(req.params.id);
        userService.getById(id)
        .then(_.partial(handle.onSuccess, res))
        .catch(_.partial(handle.onError, res, `Ocorreu um erro ao buscar o usuário pelo id: ${id}`));
    }    

    create(req: Request, res: Response){
        userService.create(req.body)
        .then(_.partial(handle.onSuccess, res))
        .catch(_.partial(handle.dbError, res))
        .catch(_.partial(handle.onError, res, 'Ocorreu um erro ao tentar criar um usuário!'));
    }

    update(req: Request, res: Response){
        const id = parseInt(req.params.id);
        const props = req.body;
        userService.update(id, props)
        .then(_.partial(handle.onSuccess, res))
        .catch(_.partial(handle.dbError, res))
        .catch(_.partial(handle.onError, res, 'Ocorreu um erro ao tentar atualizar o usuário!'));
    }
    
    delete(req: Request, res: Response){
        const id = parseInt(req.params.id);
        userService.delete(id)
        .then(_.partial(handle.onSuccess, res))
        .catch(_.partial(handle.dbError, res))
        .catch(_.partial(handle.onError, res, 'Ocorreu um erro ao tentar excluir um usuário!' ));
    }    

}

export default new UserController();