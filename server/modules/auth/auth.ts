import { Request, Response } from 'express';
import * as _ from 'lodash';
import userService from '../user/service';
import authSuccess from '../../api/responses/authSuccess';
import authError from '../../api/responses/authError';

class TokenRoutes {

    constructor(){}

    auth(req: Request, res: Response){
        const credentials = {
            email: req.body.email,
            password: req.body.password
        }

        if(credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')){
            userService.getByEmail(credentials.email)
            .then(_.partial(authSuccess, res, credentials))
            .catch(_.partial(authError, req, res));
        }
    }
}

export default TokenRoutes;
