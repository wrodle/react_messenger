import { notification } from 'antd';

const openNotification = ({text, type = 'info', title, duration = 2}) => {
    notification[type]({
        message: title,
        description: text,
        duration: duration
    });
}

export default openNotification;