import { messagesApi } from '../../utils/api'

const actions = {
    setMessages: items => ({
        type: 'MESSAGES:SET_ITEMS',
        payload: items
    }),
    addMessage: message => (dispatch, currentDialog) => {
        if (message.dialog._id === currentDialog) {
            dispatch({
                type: 'MESSAGES:ADD_MESSAGE',
                payload: message
            })
        }
    },
    fetchMessages: (dialogId) => dispatch => {
        dispatch(actions.setIsLoading(true))
        messagesApi.getAllByDialogId(dialogId).then(({data}) => {
            dispatch(actions.setMessages(data))
        }).catch(() => {
            dispatch((actions.setIsLoading(false)))
        })
    },
    setIsLoading: bool => ({
        type: 'MESSAGES:SET_IS_LOADING',
        payload: bool
    }),
    fetchSendMessage: (text, dialogId) => {
        messagesApi.send(text, dialogId)
    }
}

export default actions;