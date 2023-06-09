import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_FAIL, ORDER_REQUEST, ORDER_SAVE_REQUEST, ORDER_SUCCESS, TOTAL_ORDER_FAIL, TOTAL_ORDER_REQUEST, TOTAL_ORDER_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from '../constants/orderConstants'
import axios from 'axios'
import { apiEndpoint } from "../../API_ENDPOINT"

export const userCartOrder = (order) => async (dispatch) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order })
    try {
        const { data } = await axios.post(`${apiEndpoint}/api/order/order`, order)
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
        // localStorage.setItem('orderId', JSON.stringify(data))
        // localStorage.setItem('orderId', data?.saveOrder?._id)
    } catch (error) {
        dispatch({ type: ORDER_CREATE_FAIL, payload: error?.response?.data?.message })
    }
}
export const userSaveOrder = (userId, orderId) => async (dispatch) => {
    const { data } = await axios.post(`${apiEndpoint}/api/order/get-order`, { userId: userId, orderId: orderId })
    try {
        if (data) {
            dispatch({ type: ORDER_SAVE_REQUEST, payload: data })
        }
        setTimeout(() => {
            localStorage.removeItem('shippingAddress')
            localStorage.removeItem('saveCart')
            localStorage.removeItem('payment')
        }, 3000)

    } catch (error) {
        console.log(error)
    }
}

export const userOrderData = (userId) => async (dispatch) => {
    dispatch({ type: ORDER_REQUEST, payload: userId })
    try {
        const { data } = await axios.post(`${apiEndpoint}/api/order/get-user-orders`, { userId: userId })
        dispatch({ type: ORDER_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({
            type: ORDER_FAIL, payload:
                error?.response && error?.response?.data?.message ?
                    error.response.data.message : error.message
        })
    }
}

export const allOrders = () => async (dispatch) => {
    dispatch({ type: TOTAL_ORDER_REQUEST })
    try {
        const { data } = await axios.get(`${apiEndpoint}/api/order/all-orders`)
        dispatch({ type: TOTAL_ORDER_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({
            type: TOTAL_ORDER_FAIL, payload: error?.response && error?.response?.data?.message ?
                error.response.data.message : error.message
        })
    }
}

export const updateUserOrder = (order) => async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_REQUEST, payload: order })
    try {
        const { data } = await axios.post(`${apiEndpoint}/api/order/update-order/isPaid`, order)
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL, payload: error?.response && error?.response?.data?.message ?
                error.response.data.message : error.message
        })
    }
}
export const updateUserOrderIsDelivered = (order) => async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_REQUEST, payload: order })
    try {
        const { data } = await axios.post(`${apiEndpoint}/api/order/update-order/isDelivered`, order)
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL, payload: error?.response && error?.response?.data?.message ?
                error.response.data.message : error.message
        })
    }
}