import express from 'express';
import { verifyJWTToken } from '../utils';

declare global {
    namespace Express {
        interface Request {
            user: any
        }
    }
}

function checkAuth(req: express.Request, res: express.Response, next: express.NextFunction) {

    if (req.path === '/user/login' || req.path === '/user/registration') {
        return next()
    }

    const token = req.headers.token

    verifyJWTToken(token).then((user: any) => {
        req.user = user.data._doc
        next()
    }).catch(() => {
        res.status(400).json({
            message: 'Invalid auth token provided.'
        })
    })

}

export default checkAuth;