import mongoose, {Schema} from "mongoose";

export interface IMessage {
    text: string,
    unread: boolean,
    dialog: {
        type: Schema.Types.ObjectId,
        ref: string,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: string,
    }
}

const MessageSchema = new Schema({
    text: String,
    unread: Number,
    dialog: {
        type: Schema.Types.ObjectId,
        ref: 'Dialog',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
});

const Message = mongoose.model<IMessage>("Message", MessageSchema)

export default Message;