const initialState = {
    items: [],
    currentDialog: null,
    isLoading: false
}

const dialogsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case 'DIALOGS:SET_ITEMS':
            return {...state, items: [...payload]}
        case 'DIALOGS:SET_CURRENT_DIALOG':
            return {...state, currentDialog: payload}
        default:
            return state
    }
}

export default dialogsReducer