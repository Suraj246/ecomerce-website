// import { productDetails } from "../actions/productActions";
import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, GET_UPDATE_PRODUCT_DATA, PRODUCT_FAIL, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_REQUEST, PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../constants/productConstants";

export const productListReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_LIST_FAIL:
            return { loading: false, err: action.payload }
        default:
            return state
    }
}

export const productDetailsReducer = (state = { loading: true, product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return { loading: true }
        case PRODUCT_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const createProductReducer = (state = { loading: true, product: {} }, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return { loading: true }
        case CREATE_PRODUCT_SUCCESS:
            return { loading: false, product: action.payload }
        case CREATE_PRODUCT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const deleteProductReducer = (state = { loading: true, product: {} }, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            return { loading: true }
        case DELETE_PRODUCT_SUCCESS:
            return { loading: false, product: action.payload }
        case DELETE_PRODUCT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const getUpdateProductReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_UPDATE_PRODUCT_DATA:
            return { updateProduct: action.payload }
        default:
            return state
    }
}

export const updateProductReducer = (state = { loading: true, product: {} }, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_REQUEST:
            return { loading: true }
        case UPDATE_PRODUCT_SUCCESS:
            return { loading: false, product: action.payload }
        case UPDATE_PRODUCT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}