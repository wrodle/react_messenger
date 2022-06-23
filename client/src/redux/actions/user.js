import {userApi} from "../../utils/api";
import {openNotification} from "../../utils/helpers";
import {axios} from "../../core";

const actions = {
    setUserData: data => ({
       type: 'USER:SET_DATA',
       payload: data
    }),
    fetchUserData: (dispatch, token) => {
        axios.get("/user/me", {
            headers: {
                'token': token
            }
        }).then(({data}) => {
            dispatch(actions.setUserData(data))
        })
    },
    fetchUserLogin: data => dispatch => {
        return userApi.login(data).then(({data}) => {
            const {status, token} = data
            if (status === 'error') {
                openNotification({
                    text: 'Неверный логин или пароль',
                    type: 'error',
                    title: 'Ошибка при авторизации'
                })
                dispatch(actions.setUserData(null))
                return 'error'
            } else {
                openNotification({
                    text: 'Авторизация успешна!',
                    type: 'success'
                })
                dispatch(actions.setUserData(data))
            }
            localStorage.setItem('token', token);
            actions.fetchUserData(dispatch, token)
        })
    },
    fetchUserRegistration: data => dispatch => {
        return userApi.registration(data).then(({data}) => {
            const {status, token} = data
            if (status === 'error') {
                openNotification({
                    text: 'Неверный логин или пароль',
                    type: 'error',
                    title: 'Ошибка при авторизации'
                })
                return 'error'
            } else {
                openNotification({
                    text: 'Авторизация успешна!',
                    type: 'success'
                })
            }
            localStorage.setItem('token', token);
            actions.fetchUserData(dispatch, token)
        })
    }
}

export default actions;