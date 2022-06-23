import React from 'react';
import PropTypes from 'prop-types'

import classNames from "classnames";

import './Messages.scss';
import {Empty, Spin} from "antd";
import {Message} from "../";
import {useSelector} from "react-redux";
import messagesReducer from "../../redux/reducers/messages";


const Messages = ({ blockRef, isLoading, items, user }) => {

    return (
        <div ref={blockRef} className="chat__dialog-messages">
            <div className={classNames('messages', {
                "messages--online": isLoading
            })}>
                {isLoading ? (
                    <div></div>
                )   : items ? (
                        items.length > 0 ? (
                            items.map(item => (
                                <Message key={item._id}{...item} isMe={user._id === item.user._id}/>
                            ))
                        ) : <Empty description="Диалог пуст"/>
                ): <Empty description="Откройте диалог"/>
                }
            </div>
        </div>
    )
};

export default Messages;