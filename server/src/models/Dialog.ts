import mongoose, { Schema } from "mongoose";
import isEmail from 'validator/lib/isEmail'

export interface IDialog{
    partner: {
        type: Schema.Types.ObjectId,
        ref: string
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: string
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: string
    },
}

const DialogSchema = new Schema({
    partner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },

}, {
    timestamps: true
});

const Dialog = mongoose.model<IDialog>("Dialog", DialogSchema)

export default Dialog;