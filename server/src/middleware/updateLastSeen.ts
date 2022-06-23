import express from "express";

import {UserModel} from "../models";

async function updateLastSeen(req: express.Request, res: express.Response, next: express.NextFunction) {

    if (req.path === '/user/login' || req.path === '/user/registration') {
        return next()
    }

    UserModel.updateOne({id: req.user._id}, {last_seen: new Date()}, () => {})
    next()
}

export default updateLastSeen;