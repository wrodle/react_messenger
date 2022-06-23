import express from "express";
import { UserModel } from '../models';
import { createJWTToken } from "../utils";
const bcrypt = require('bcrypt');
class UserController {

    constructor(io: any) {
        // @ts-ignore
        this.io = io
    }

    show =(req: express.Request, res: express.Response) => {
        const id = req.user._id
        UserModel.findById(id, (err: any, user: any) => {
            if (err) {
                return res.status(404).json({
                    message: 'Not found'
                })
            }
            res.json(user)
        })
    }

    getMe = (req: express.Request, res: express.Response) => {
        const id = req.user._id
        UserModel.findById(id, (err: any, user: any) => {
            if (err || !user) {
                return res.status(404).json({
                    message: 'Not found'
                })
            }
            console.log(user.isOnline)
            res.json(user)
        })
    }

    create = (req: express.Request, res: express.Response) => {

        const postData = {
            email: req.body.email,
            fullname: req.body.fullname,
        }
        const hashPassword = bcrypt.hashSync(req.body.password, 3);

        const user = new UserModel({...postData, password: hashPassword});
        const token = createJWTToken(user)
        user.save().then((obj: any) => {
            res.json
            ({
                obj,
                token
            });
        }).catch(reason => {
            res.json(reason);
        });
    }

    login =(req: express.Request, res: express.Response) => {
        const postData = {
            email: req.body.email,
            password: req.body.password
        }
        UserModel.findOne({email: postData.email}, async (err: any, user: any) => {
            if (err || !user) {
                return res.json({
                    status: 'error',
                    message: 'User not found'
                })
            }

            const result = await bcrypt.compare(postData.password, user.password).then(function(result: any) {
                return result
            });

            if (result) {
                const token = createJWTToken(user)
                res.json({
                    status: 'success',
                    token
                })
            } else {
                res.json({
                    status: 'error',
                    message: 'Incorrect password or email'
                })
            }
        })

    }

    delete =(req: express.Request, res: express.Response) => {
        const id = req.params.id
        UserModel.findOneAndDelete({ id }, (err: any, user: any) => {
            if (err) {
                return res.status(404).json({
                    message: 'Not found'
                })
            }
            res.json({
                message: `User ${user.fullname} deleted`
            })
        })
    }

}

export default UserController;