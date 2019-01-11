import { Request, Response } from 'express';
import * as HttpStatus from 'http-status';
import * as jwt from 'jwt-simple';
const config = require('../../config/env/config')();

export default function authSuccess(res: Response, credentials: any, data: any){
    const isMath = (credentials.password == data.password);
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