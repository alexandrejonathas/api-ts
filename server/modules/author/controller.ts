import { Request, Response } from 'express';
import * as _ from 'lodash';
import authorService from './service';
import handle from '../../api/responses/handle';

class AuthorController {

    constructor(){}

    getAll(req: Request, res: Response){
        authorService.getAll()
        .then(_.partial(handle.onSuccess, res))
        .catch(_.partial(handle.onError, res, 'Ocorreu um erro ao buscar todos os autores!'));
    }

    findOne(req: Request, res: Response){
        let id = parseInt(req.params.id);
        authorService.getById(id)
        .then(_.partial(handle.onSuccess, res))
        .catch(_.partial(handle.onError, res, `Ocorreu um erro ao buscar o autor pelo id: ${id}`));
    }    

    create(req: Request, res: Response){
        authorService.create(req.body)
        .then(_.partial(handle.onSuccess, res))
        .catch(_.partial(handle.dbError, res))
        .catch(_.partial(handle.onError, res, 'Ocorreu um erro ao tentar criar um autor!'));
    }

    update(req: Request, res: Response){
        const id = parseInt(req.params.id);
        const props = req.body;
        authorService.update(id, props)
        .then(_.partial(handle.onSuccess, res))
        .catch(_.partial(handle.dbError, res))
        .catch(_.partial(handle.onError, res, 'Ocorreu um erro ao tentar atualizar o autor!'));
    }
    
    delete(req: Request, res: Response){
        const id = parseInt(req.params.id);
        authorService.delete(id)
        .then(_.partial(handle.onSuccess, res))
        .catch(_.partial(handle.dbError, res))
        .catch(_.partial(handle.onError, res, 'Ocorreu um erro ao tentar excluir um autor!' ));
    }    

}

export default new AuthorController();