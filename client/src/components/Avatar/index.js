import React from 'react';

import './Avatar.scss';
import {generateAvatar} from "../../utils/helpers";

const Avatar = ({ user }) => {
    if (user?.avatar) {
        return <img className="avatar" src={user.avatar} alt={user.fullname}/>
    } else {
        const {color, colorLighten} = generateAvatar(user._id);
        const firstChar = user.fullname[0]
        return (
        <div
            style={{
                background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`,
            }}
            className="avatar avatar--symbol">
            {firstChar}
        </div>)
    }
};

export default Avatar;