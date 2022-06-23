import { dialogsApi } from '../../utils/api'

const actions = {
    setDialogs: items => ({
       type: 'DIALOGS:SET_ITEMS',
       payload: items
    }),
    fetchDialogs: () => dispatch => {
        dialogsApi.getAll().then(({data}) => {
            dispatch(actions.setDialogs(data))
        })
    },
    setCurrentDialog: id => ({
        type: 'DIALOGS:SET_CURRENT_DIALOG',
        payload: id
    })
}

export default actions;