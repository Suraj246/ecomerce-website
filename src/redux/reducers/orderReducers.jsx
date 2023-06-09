import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_FAIL, ORDER_REQUEST, ORDER_SAVE_REQUEST, ORDER_SUCCESS, TOTAL_ORDER_FAIL, TOTAL_ORDER_REQUEST, TOTAL_ORDER_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, } from "../constants/orderConstants"

export const orderCreateReducers = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true }
        case ORDER_CREATE_SUCCESS:
            // return { loading: false, order: action.payload }
            return { loading: false, success: true, order: action.payload }
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }
}
export const orderSaveReducers = (state = {}, action) => {
    switch (action.type) {
        case ORDER_SAVE_REQUEST:
            return { ...state, order: action.payload }
        default:
            return state

    }
}

export const orderDataReducers = (state = {}, action) => {
    switch (action.type) {
        case ORDER_REQUEST:
            return { loading: true }
        case ORDER_SUCCESS:
            return { loading: false, order: action.payload }
        case ORDER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const totalOrdersReducers = (state = {}, action) => {
    switch (action.type) {
        case TOTAL_ORDER_REQUEST:
            return { loading: true }
        case TOTAL_ORDER_SUCCESS:
            return { loading: false, order: action.payload }
        case TOTAL_ORDER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const customerUpdateOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ORDER_REQUEST:
            return { loading: true }
        case UPDATE_ORDER_SUCCESS:
            return { loading: false, updateOrderData: action.payload }
        case UPDATE_ORDER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
