import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createProductReducer, deleteProductReducer, getUpdateProductReducer, productDetailsReducer, productListReducer, updateProductReducer } from './reducers/productReducers'
import { cartItemReducer, cartItemsListReducer, shippingAddressReducer } from './reducers/cartReducers'
import { allUsersReducer, customerDetailsReducer, userLoginReducer, userRegisterReducer } from './reducers/userReducer'
import { customerUpdateOrderReducer, orderCreateReducers, orderDataReducers, orderSaveReducers, totalOrdersReducers } from './reducers/orderReducers'

const initialState = {
    userSignIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
}

const reducer = combineReducers({
    productList: productListReducer,
    product: productDetailsReducer,
    cart: cartItemReducer,
    cartItemList: cartItemsListReducer,
    userSignIn: userLoginReducer,
    userRegister: userRegisterReducer,
    saveShippingAddress: shippingAddressReducer,
    createOrder: orderCreateReducers,
    saveOrder: orderSaveReducers,
    orderData: orderDataReducers,
    createProduct: createProductReducer,
    users: allUsersReducer,
    customerDetails: customerDetailsReducer,
    updatedOrder: customerUpdateOrderReducer,
    allOrders: totalOrdersReducers,
    removeProduct: deleteProductReducer,
    getUpdateProduct: getUpdateProductReducer,
    updateProduct: updateProductReducer
})

const store = configureStore({ reducer, initialState })
// const store = configureStore({
//     reducer: {},
// })

export default store