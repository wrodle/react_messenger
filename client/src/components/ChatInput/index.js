import React, {useState} from 'react';
import {Button, Input} from 'antd';
import {SendOutlined} from "@ant-design/icons";
import './ChatInput.scss';
import {messagesActions} from "../../redux/actions";
import {useSelector} from "react-redux";


const ChatInput = ({ children, className }) => {
    const [value, setValue] = useState('')
    const currentDialog = useSelector(state => state.dialogsReducer.currentDialog)

    const sendMessage = (e) => {
        if (e.keyCode === 13) {
            messagesActions.fetchSendMessage(value, currentDialog)
            setValue('')
        }
    }

    return (
        <div className="chat-input">
            <Input
                onKeyUp={sendMessage}
                size="large"
                placeholder="Введите текст сообщения…"
                onChange={e => setValue(e.target.value)}
                value={value}
            />
            <div className="chat-input__actions">
                <Button type="text" shape="circle" icon={<SendOutlined/>}/>
            </div>
        </div>
    )
};

export default ChatInput;