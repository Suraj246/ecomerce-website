import axios from "axios";
import { CUSTOMER_DETAILS_FAIL, CUSTOMER_DETAILS_REQUEST, CUSTOMER_DETAILS_SUCCESS, USERS_FAIL, USERS_REQUEST, USERS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants"
import { apiEndpoint } from "../../API_ENDPOINT";


export const userLogin = (input) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST, payload: input });
    console.log("User", input)
    try {
        const { data } = await axios.post(`${apiEndpoint}/api/users/login`, input)
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        console.log(data)
        localStorage.setItem("userInfo", JSON.stringify(data))
        if (data?.userAvailable) {
            localStorage.setItem("userId", data?.userId)
            localStorage.setItem("token", data?.token)
        }

    } catch (error) {
        // error?.response?.data?.message
        console.log(error)
        dispatch({
            type: USER_LOGIN_FAIL, payload:
                error?.response && error?.response?.data?.message ?
                    error.response.data.message : error.message
        })
    }
}

export const userRegister = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: name, email, password });
    try {
        const { data } = await axios.post(`${apiEndpoint}/api/users/signup`, { name, email, password })
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL, payload: error?.response && error?.response?.data?.message ?
                error.response.data.message : error.message
        })
    }
}

export const allUsers = () => async (dispatch) => {
    dispatch({ type: USERS_REQUEST });
    try {
        const { data } = await axios.get(`${apiEndpoint}/api/users/all-users`)
        // console.log(data)
        dispatch({ type: USERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USERS_FAIL, payload: error?.response && error?.response?.data?.message ?
                error.response.data.message : error.message
        })
    }
}

export const customerDetails = (id) => async (dispatch) => {
    dispatch({ type: CUSTOMER_DETAILS_REQUEST, payload: id })
    try {
        const { data } = await axios.get(`${apiEndpoint}/api/users/${id}`)
        dispatch({ type: CUSTOMER_DETAILS_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({
            type: CUSTOMER_DETAILS_FAIL, payload: error?.response && error?.response?.data?.message ?
                error.response.data.message : error.message
        })
    }
}


