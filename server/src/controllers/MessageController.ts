import express from "express";
import {DialogModel, MessageModel, UserModel} from '../models';

class MessageController {

    constructor(io: any) {
        // @ts-ignore
        this.io = io
    }

    show = (req: express.Request, res: express.Response) => {
        const dialogId = req.query.dialog
        MessageModel
            .find({dialog: dialogId})
            .populate('dialog')
            .populate('user')
            .exec (function (err, messages) {
                if (err) {
                    return res.status(404).json({
                        message: 'Messages not found'
                    })
                }
                return res.json(messages)
            })
    }

    getMe() {
        // Сделать возвращение инфы о самом себе
    }

    create = (req: express.Request, res: express.Response) => {
        const userId = req.user._id

        const postData = {
            text: req.body.text,
            dialog: req.body.dialog_id,
            user: userId
        }
        const message = new MessageModel(postData);
        message
            .save().then((obj: any) => {
                obj.populate(['dialog', 'user'], (err: any, message: any) => {

                    if (err) {
                        return res.status(500).json({
                            status: 'error',
                            message: err
                        })
                    }

                    DialogModel.findOneAndUpdate(
                        { _id: postData.dialog },
                        { lastMessage: message._id },
                        {upsert: true},
                        function (err) {
                            if (err) {
                                return res.status(500).json({
                                    status: 'error',
                                    message: err
                                })
                            }}
                    )

                    res.json(message);
                    // @ts-ignore
                    this.io.emit('SERVER:NEW_MESSAGE', obj)
                })
        }).catch(reason => {
            res.json(reason);
        });
    }

    delete = (req: express.Request, res: express.Response) => {
        const id = req.params.id
        MessageModel.findOneAndDelete({ id }, (err: any, message: any) => {
            if (err) {
                return res.status(404).json({
                    message: 'Message not found'
                })
            }
            res.json({
                message: `Message deleted`
            })
        })
    }

}

export default MessageController;