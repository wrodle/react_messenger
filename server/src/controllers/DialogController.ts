import express from "express";
import {DialogModel, MessageModel} from '../models';

class DialogController {

    constructor(io: any) {
        // @ts-ignore
        this.io = io
    }

    index = (req: express.Request, res: express.Response) => {
        const userId = req.user._id;
        DialogModel
            .find()
            .or([{ author: userId }, { partner: userId }])
            .populate('author')
            .populate('partner')
            .populate({
                path: 'lastMessage',
                populate: {
                    path: 'user',
                },
            })
            .exec (function (err, dialogs) {
                if (err) {
                    return res.status(404).json({
                        message: 'Dialogs not found'
                    })
                }
                return res.json(dialogs)
            })
    }

    create = (req: express.Request, res: express.Response) => {
        const postData = {
            author: req.user._id,
            partner: req.body.partner,
        }
        const dialog = new DialogModel(postData);
        dialog.save().then((dialogObg: any) => {

            const message = new MessageModel({
                text: req.body.text,
                dialog: dialogObg._id,
                user: req.user._id
            })
            message.save()
                .then(() => {
                    dialogObg.lastMessage = message._id
                    dialogObg.save().then(() => {
                        res.json(dialogObg)
                        // @ts-ignore
                        this.io.emit('SERVER:DIALOG_CREATED', {
                            ...postData,
                            dialog: dialogObg
                        })
                    })
                })
                .catch(reason => {
                    res.json(reason);
                });

        }).catch(reason => {
            res.json(reason);
        });
    }

    delete = (req: express.Request, res: express.Response) => {
        const id = req.params.id
        DialogModel.findOneAndDelete({ id }, (err: any, dialog: any) => {
            if (err) {
                return res.status(404).json({
                    message: 'Not found'
                })
            }
            res.json({
                message: `Dialog deleted`
            })
        })
    }

/*    show(req: express.Request, res: express.Response) {
        const id = req.params.id
        DialogModel.findById(id, (err: any, user: any) => {
            if (err) {
                return res.status(404).json({
                    message: 'Not found'
                })
            }
            res.json(user)
        })
    }

    getMe() {
        // Сделать возвращение инфы о самом себе
    }*/

}

export default DialogController;