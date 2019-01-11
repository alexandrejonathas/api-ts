import { Request, Response } from 'express';
import * as HttpStatus from 'http-status';

export default function authError(req: Request, res: Response){
    res.sendStatus(HttpStatus.UNAUTHORIZED);
}