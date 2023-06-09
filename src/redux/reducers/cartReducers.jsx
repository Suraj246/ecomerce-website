import { ADD_CART_ITEM, CART_ITEMS_FAIL, CART_ITEMS_REQUEST, CART_ITEMS_SUCCESS, CART_ITEM_REMOVE_FAIL, CART_ITEM_REMOVE_REQUEST, CART_ITEM_REMOVE_SUCCESS, SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const cartItemReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_CART_ITEM:
            return { ...state, cartItems: [...state.cartItems, action.payload] };
        default:
            return state
    }
}

export const cartItemsListReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ITEMS_REQUEST:
            return { loading: true }
        case CART_ITEMS_SUCCESS:
            return { loading: false, cart: action.payload }
        case CART_ITEMS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const cartItemRemoveReducer = (state, action) => {
    switch (action.type) {
        case CART_ITEM_REMOVE_REQUEST:
            return { loading: true }
        case CART_ITEM_REMOVE_SUCCESS:
            return { loading: false, cart: action.payload }
        case CART_ITEM_REMOVE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const shippingAddressReducer = (state = {}, action) => {
    switch (action.type) {
        case SAVE_SHIPPING_ADDRESS:
            return { shipping: action.payload }
        default:
            return state
    }
}