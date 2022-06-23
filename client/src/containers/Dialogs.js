import React, {useEffect, useState} from 'react';
import {Dialogs as BaseDialogs} from '../components'
import {useSelector, useDispatch} from "react-redux";
import { dialogsActions } from '../redux/actions'
import socket from '../core/socket'

const Dialogs = ({ userId }) => {
    const dispatch = useDispatch()
    const dialogs = useSelector(state => state.dialogsReducer.items)

    const [inputValue, setValue] = useState('')
    const [filtred, setFiltredItems] = useState([])

    const onChangeInput = value => {
        setValue(value)
        setFiltredItems(dialogs.filter(
            dialog =>
                dialog.author.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
                dialog.partner.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0,
        ))
    }

    useEffect( () => {
        if (!dialogs.length) {
            dialogsActions.fetchDialogs()(dispatch)
        } else {
            setFiltredItems(dialogs)
        }
    }, [dialogs])

    useEffect(() => {
        socket.on('SERVER:DIALOG_CREATED', data => {
            dialogsActions.fetchDialogs()(dispatch)
        })
    }, [])

    return (
        <div>
            <BaseDialogs
                items={filtred}
                onSearch={onChangeInput}
                inputValue={inputValue}
                onSelectDialog={dialogsActions.setCurrentDialog}
            />
        </div>
    );
};

export default Dialogs;