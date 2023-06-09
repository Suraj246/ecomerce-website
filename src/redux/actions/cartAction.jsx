import axios from "axios"
import { ADD_CART_FAIL, ADD_CART_ITEM, CART_ITEMS_FAIL, CART_ITEMS_REQUEST, CART_ITEMS_SUCCESS, CART_ITEM_REMOVE_FAIL, CART_ITEM_REMOVE_REQUEST, CART_ITEM_REMOVE_SUCCESS, SAVE_PAYMENT, SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants"
import { apiEndpoint } from "../../API_ENDPOINT"

export const addToCart = (productData) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${apiEndpoint}/product`, productData)
        dispatch({ type: ADD_CART_ITEM, payload: data })
    }
    catch (error) {
        console.log(error)
        dispatch({ type: ADD_CART_FAIL, payload: error?.response?.data?.message })
    }
}

export const cartItemLists = (data) => async (dispatch) => {
    dispatch({ type: CART_ITEMS_REQUEST, payload: data })
    try {
        await axios.post(`${apiEndpoint}/get-products`, data)
            .then((res) => {
                dispatch({ type: CART_ITEMS_SUCCESS, payload: res?.data?.data?.cart })
            })
    } catch (error) {
        dispatch({ type: CART_ITEMS_FAIL, payload: error?.response?.data?.message })
    }
}

export const cartItemRemove = (id, idx) => async (dispatch) => {
    dispatch({ type: CART_ITEM_REMOVE_REQUEST, payload: id, idx })
    try {
        const { data } = await axios.delete(`${apiEndpoint}/${id}/${idx}`)
        dispatch({ type: CART_ITEM_REMOVE_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: CART_ITEM_REMOVE_FAIL, payload: error?.response?.data?.message })
    }
}

export const saveShippingAddress = (input) => (dispatch) => {
    dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: input })
    localStorage.setItem('shippingAddress', JSON.stringify(input))
}

export const savePayment = (payment) => (dispatch) => {
    dispatch({ type: SAVE_PAYMENT, payload: payment })
    localStorage.setItem('payment', payment)
}
