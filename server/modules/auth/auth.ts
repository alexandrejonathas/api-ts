import { Request, Response } from 'express';
import * as _ from 'lodash';
import userService from '../user/service';
import handle from '../../api/responses/handle';

class TokenRoutes {

    constructor(){}

    auth(req: Request, res: Response){
        const credentials = {
            email: req.body.email,
            password: req.body.password
        }

        if(credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')){
            userService.getByEmail(credentials.email)
            .then(_.partial(handle.authSuccess, res, credentials))
            .catch(_.partial(handle.authError, req, res));
        }
    }
}

export default new TokenRoutes();
