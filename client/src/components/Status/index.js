import React from 'react';
import classNames from "classnames";

import './Status.scss';

const Status = ({ online }) => (
    <span className={classNames('status', {
        'status--online': online
    })}>
        {online ? 'Онлайн' : 'Офлайн'}
    </span>
)

export default Status;