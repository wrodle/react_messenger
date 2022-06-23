import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail'
const { Schema } = require('mongoose');
import {differenceInMinutes} from 'date-fns'

export interface IUser {
    email: string,
    fullname: string,
    password: string,
    confirmed: string,
    confirm_hash: string,
    avatar?: string,
    last_seen?: Date
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: 'Email address is required',
        validate: {
            validator: isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        },
        unique: true
    },
    avatar: String,
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    confirm_hash: String,
    last_seen: {
        type: Date,
        default: new Date(),
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

const virtual = UserSchema.virtual('isOnline');
virtual.get(function(value: any, virtual: any, doc: any) {
    return differenceInMinutes(new Date(), new Date(doc.last_seen)) < 5
});

UserSchema.set("toJSON", {
    virtuals: true
})



const User = mongoose.model<IUser>("User", UserSchema)

export default User;