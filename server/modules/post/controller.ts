import { Request, Response } from 'express';
import * as _ from 'lodash';
import postService from './service';
import handle from '../../api/responses/handle';

class PostController {

    constructor(){}

    getAll(req: Request, res: Response){
        postService.getAll()
        .then(_.partial(handle.onSuccess, res))
        .catch(_.partial(handle.onError, res, 'Ocorreu um erro ao buscar todos os autores!'));
    }

    findOne(req: Request, res: Response){
        let id = parseInt(req.params.id);
        postService.getById(id)
        .then(_.partial(handle.onSuccess, res))
        .catch(_.partial(handle.onError, res, `Ocorreu um erro ao buscar o autor pelo id: ${id}`));
    }    

    create(req: Request, res: Response){
        postService.create(req.body)
        .then(_.partial(handle.onSuccess, res))
        .catch(_.partial(handle.dbError, res))
        .catch(_.partial(handle.onError, res, 'Ocorreu um erro ao tentar criar um autor!'));
    }

    update(req: Request, res: Response){
        const id = parseInt(req.params.id);
        const props = req.body;
        postService.update(id, props)
        .then(_.partial(handle.onSuccess, res))
        .catch(_.partial(handle.dbError, res))
        .catch(_.partial(handle.onError, res, 'Ocorreu um erro ao tentar atualizar o autor!'));
    }
    
    delete(req: Request, res: Response){
        const id = parseInt(req.params.id);
        postService.delete(id)
        .then(_.partial(handle.onSuccess, res))
        .catch(_.partial(handle.dbError, res))
        .catch(_.partial(handle.onError, res, 'Ocorreu um erro ao tentar excluir um autor!' ));
    }    

}

export default new PostController();