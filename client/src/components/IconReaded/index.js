import React from 'react';
import PropTypes from "prop-types";

import './IconReaded.scss';
import readedSvg from "../../assets/img/readed.svg";
import noreadedSvg from "../../assets/img/noreaded.svg";

const IconReaded = ({ isMe, isReaded }) =>
    isMe && (isReaded ? (
        <img
            className="message__icon-read"
            src={readedSvg}
            alt="Readed"
        />
    ) : (
        <img
            className="message__icon-read message__icon-read--no"
            src={noreadedSvg}
            alt="Noreaded"
        />
    ));


IconReaded.propTypes = {
    isMe: PropTypes.bool,
    isReaded: PropTypes.bool
};

export default IconReaded;