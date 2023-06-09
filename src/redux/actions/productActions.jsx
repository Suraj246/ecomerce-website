import axios from "axios"
import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, GET_UPDATE_PRODUCT_DATA, PRODUCT_FAIL, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_REQUEST, PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../constants/productConstants"
import { apiEndpoint } from "../../API_ENDPOINT"

export const listProducts = () => async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    try {
        const { data } = await axios.get(`${apiEndpoint}`)
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    }
    catch (err) {
        dispatch({
            type: PRODUCT_LIST_FAIL, payload: err?.response && err?.response?.data?.message ?
                err.response.data.message : err.message
        })
    }
}

export const productDetails = (id) => async (dispatch) => {
    dispatch({ type: PRODUCT_REQUEST, payload: id })
    try {
        const { data } = await axios.get(`${apiEndpoint}/${id}`)
        dispatch({ type: PRODUCT_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_FAIL, payload: error?.response && error?.response?.data?.message ?
                error.response.data.message : error.message
        })
    }
}

export const createProduct = (formData) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST, payload: formData })
    try {
        const { data } = await axios.post(`${apiEndpoint}/api/product/create-product`, formData)
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAIL, payload: error?.response && error?.response?.data?.message ?
                error.response.data.message : error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    console.log('deleteProduct', id)
    dispatch({ type: DELETE_PRODUCT_REQUEST, payload: id })
    try {
        const { data } = await axios.delete(`${apiEndpoint}/api/product/delete-product/${id}`)
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data })
        console.log(data)
    }
    catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL, payload: error?.response && error?.response?.data?.message ?
                error.response.data.message : error.message
        })
    }
}

export const getUpdateProductData = (item) => async (dispatch) => {
    console.log(item)
    dispatch({ type: GET_UPDATE_PRODUCT_DATA, payload: item })
}

export const updateSelectedProduct = (id, item) => async (dispatch) => {

    dispatch({ type: UPDATE_PRODUCT_REQUEST, payload: item })
    try {
        const { data } = await axios.put(`${apiEndpoint}/api/product/update-product/${id}`, item)
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data })
        console.log(data)
    }
    catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL, payload: error?.response && error?.response?.data?.message ?
                error.response.data.message : error.message
        })
    }
}