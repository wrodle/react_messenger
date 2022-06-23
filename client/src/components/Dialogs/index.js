import React from 'react';
import classNames from "classnames";
import { Empty } from 'antd';
import isToday from "date-fns/isToday";
import {Input} from "antd";
import {orderBy} from "lodash";

import './Dialogs.scss';
import {DialogItem} from "../index";

const { Search } = Input;

const Dialogs = ({ items, onSearch, inputValue, onSelectDialog }) => {

    return (
        <div className="dialogs">
            <div className="dialogs__search">
                <Search
                    placeholder="Поиск среди контактов"
                    onChange={e => onSearch(e.target.value)}
                    value={inputValue}
                />
            </div>
            {items.length
                ?
                orderBy(items, ['created_at'], ['desc']).map(
                    (item) => (<DialogItem
                    key={item._id}
                    isMe={false}
                    onSelect={onSelectDialog}
                    {...item}
                />))
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Ничего не найдено"/>
            }
        </div>
    )
};

export default Dialogs;