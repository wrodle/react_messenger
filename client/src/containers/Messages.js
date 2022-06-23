import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";

import {Messages as BaseMessages} from '../components'
import {dialogsActions, messagesActions} from '../redux/actions'
import socket from "../core/socket";

const Dialogs = ({ userId }) => {
    const dispatch = useDispatch()
    const messages = useSelector(state => state.messagesReducer.items)
    const currentDialog = useSelector(state => state.dialogsReducer.currentDialog)
    const user = useSelector(state => state.userReducer.data)
    const isLoading = useSelector(state => state.messagesReducer.isLoading)
    const messagesRef = useRef(null)


    const onNewMessage = data => {
        messagesActions.addMessage(data)(dispatch, currentDialog)
        dialogsActions.fetchDialogs()(dispatch)
    }

    useEffect( () => {
        if (currentDialog) {
            messagesActions.fetchMessages(currentDialog)(dispatch)
        }
        socket.on('SERVER:NEW_MESSAGE', onNewMessage)

        return () => {
            socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage)
        }
    }, [currentDialog])

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTo(0,9999999)
        }
    }, [messages])

    return (
        <BaseMessages
            items={messages}
            userId={userId}
            isLoading={isLoading}
            blockRef={messagesRef}
            user={user}
        />
    );
};

export default Dialogs;