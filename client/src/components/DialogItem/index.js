import React from 'react';
import classNames from "classnames";
import isToday from 'date-fns/isToday';
import format from "date-fns/format";


import {IconReaded, Avatar} from "../";
import {useDispatch, useSelector} from "react-redux";

const getMessageTime = created_at => {
    if (isToday(new Date(created_at))) { // Если меньше 24 часов, то есть сегодня
        return format(new Date(created_at), 'HH:mm')
    } else {
        return format(new Date(created_at), 'dd.MM.yyyy')
    }
}

const DialogItem = ({ _id, user, unread, isMe, text, onSelect, lastMessage }) => {
    const dispatch = useDispatch()
    const currentDialog = useSelector(state => state.dialogsReducer.currentDialog)

    return(
    <div className={classNames('dialogs__item', {
        'dialogs__item--online': lastMessage.user.isOnline,
        'dialogs__item--selected': currentDialog === _id
    })}
        onClick={() => {
            //Проверить, совпадает ли текущий id с прошлым.
            if (currentDialog !== _id) {
                dispatch(onSelect(_id))
            }
        }}
    >
         <div className="dialogs__item-avatar">
             <Avatar user={lastMessage.user}/>
         </div>
        <div className="dialogs__item-info">
            <div className="dialogs__item-info-top">
                <b>{lastMessage.user.fullname}</b>
                <span>
                    {" "}
                    {getMessageTime(lastMessage.createdAt)}
                </span>
            </div>
            <div className="dialogs__item-info-bottom">
                <p>
                    {lastMessage.text}
                </p>
                {isMe && <IconReaded isMe={true} isReaded={false}/>}
                {lastMessage.unread && (lastMessage.unread > 0 && <div className="dialogs__item-info-bottom-count">
                    {lastMessage.unread > 9 ? '+9': lastMessage.unread}
                </div>)}
            </div>
        </div>
    </div>
)};

export default DialogItem;