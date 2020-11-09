import {REMOVE_PRODUCT,ADD_PRODUCT} from '../constants/ActionTypes'


export const addProductAction = (params) => dispatch => {
    dispatch({
        type: ADD_PRODUCT,
        payload: params,
    })
}

export const removeProductAction = (params) => dispatch => {
    dispatch({
        type: REMOVE_PRODUCT,
        payload: params,
    })
}