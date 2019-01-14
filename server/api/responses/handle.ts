import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import * as HttpStatus from 'http-status';
import * as jwt from 'jwt-simple';
import * as bcrypt from 'bcrypt';
const config = require('../../config/env/config')();


class Handler{

    constructor(){}

    authSuccess(res: Response, credentials: any, data: any){
        const isMath = bcrypt.compare(credentials.password, data.password);
        if(isMath){
            const payload = {
                id: data.id
            }
            res.json({
                token: jwt.encode(payload, config.secret)
            });
        }else{
            res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
    }

    authError(req: Request, res: Response){
        res.sendStatus(HttpStatus.UNAUTHORIZED);
    }

    onSuccess(res: Response, data: any){
        res.status(HttpStatus.OK).json({payload: data});
    }    

    onError(res: Response, message: string, err: any){
        console.log(`Error: ${err}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
    }
    
    errorHandlerApi(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction){
        console.error(`API error handler foi executado: ${err}`);
        res.status(500).json({
            errorCode: 'ERR-001',
            message: 'Error interno do servidor'
        })    
    }

    dbError(res: Response, err: any){
        console.log(`Error: ${err}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: 'ERR-001',
            message: 'Error no banco de dados'
        });
    }

}

export default new Handler();