import {DialogCtrl, MessageCtrl, UserCtrl} from "../controllers";
import express from "express";
import {checkAuth, updateLastSeen} from "../middleware";

function createRouter(app: any, io: any) {
    app.use(express.json());
    app.use(checkAuth)
    app.use(updateLastSeen)

    const DialogController = new DialogCtrl(io)
    const MessageController = new MessageCtrl(io)
    const UserController = new UserCtrl(io)

    app.post('/user/registration', UserController.create)
    app.post('/user/login', UserController.login)
    app.get('/user/me', UserController.getMe)
    app.get('/user/:id', UserController.show)
    app.delete('/user/:id', UserController.delete)

    app.post('/dialogs', DialogController.create)
    app.get('/dialogs', DialogController.index)
    app.delete('/dialogs/:id', DialogController.delete)

    app.post('/messages', MessageController.create)
    app.get('/messages', MessageController.show)
    app.delete('/messages/:id', MessageController.delete)
}

export {createRouter};