import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types'

import classNames from "classnames";

import {convertCurrentTime} from '../../utils/helpers'
import './Message.scss';
import readedSvg from '../../assets/img/readed.svg';
import noreadedSvg from '../../assets/img/noreaded.svg';
import {Time, IconReaded, Avatar} from "../";
import pauseSvg from '../../assets/img/icons/pause.svg';
import playSvg from '../../assets/img/icons/play.svg';
import waveSvg from '../../assets/img/wave.svg';

const MessageAudio = ({audioSrc}) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioElem = useRef(null)
    const [progress, setProgress] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const togglePlay = () => {
        if (!isPlaying) {
            audioElem.current.play()
        } else {
            audioElem.current.pause()
        }
    }
    useEffect(() => {
        audioElem.current.volume = "0.01"
        audioElem.current.addEventListener('playing', () => {
            setIsPlaying(true)
        }, false)
        audioElem.current.addEventListener('ended', () => {
            setIsPlaying(false)
            setProgress(0)
        }, false)
        audioElem.current.addEventListener('pause', () => {
            setIsPlaying(false)
        }, false)
        audioElem.current.addEventListener('timeupdate', () => {
            const duration = audioElem.current && audioElem.current.duration || 0;
            setCurrentTime(audioElem.current.currentTime);
            setProgress((audioElem.current.currentTime / duration) * 100)
        }, false)
        audioElem.current.addEventListener('loadedmetadata', () => {
            setCurrentTime(audioElem.current.duration);
        });
    }, [])


    return (
        <div className="message__audio">
            <audio preload="true" ref={audioElem} src={audioSrc}/>
            <div className="message__audio-progress" style={{width: progress + '%'}}>
            </div>
            <div className="message__audio-info">
                <div className="message__audio-btn">
                    <button onClick={togglePlay}>
                        {isPlaying ? <img src={pauseSvg} alt="pause audio"/> : <img src={playSvg} alt="play audio"/>}
                    </button>
                </div>
                <div className="message__wave">
                    <img src={waveSvg} alt="Wave svg"/>
                </div>
                <span className="message__audio-duration">{convertCurrentTime(currentTime)}</span>
            </div>
        </div>
    )

}

const Message = ({
        user,
        text,
        date,
        isMe,
        attachments,
        isTyping,
        audio,
    }) => {

    return (
        <div className={classNames('message', {
            'message--isme': isMe,
            'message-is-typing': isTyping,
            'message--image': attachments && attachments.length === 1,
            'message--is-audio': audio,
        })}>
            <div className="message__content">
                <div className="message__avatar">
                    <Avatar user={{...user}}/>
                </div>
                <div className="message__wrapper">
                    <div className="message__info">
                        {(audio || text || isTyping) && (
                            <div className="message__bubble">
                                {text && (
                                    <div className="message__text">{text}</div>
                                )}
                                {isTyping && (
                                    <div className="message__typing">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                )}
                                {audio && <MessageAudio audioSrc={audio}/>}
                            </div>
                        )}
                        {attachments && (
                            <div className="message__attachments">
                                {attachments.map(item => (
                                    <div key={item.url} className="message__attachments-item">
                                        <img src={item.url} alt={item.filename}/>
                                    </div>
                                ))}
                            </div>
                        )}
                        {date && (
                            <span className="message__date">
                            <Time date={date}/>
                        </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

Message.defaultProps = {
    user: {}
}

Message.propTypes = {
    avatar: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.object,
    user: PropTypes.object,
    attachments: PropTypes.array,
    isMe: PropTypes.bool,
    isTyping: PropTypes.bool,
    audio: PropTypes.string
};

export default Message;