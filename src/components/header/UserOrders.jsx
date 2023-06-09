import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userOrderData } from '../../redux/actions/orderAction'
import "./header.css"
import { useNavigate } from 'react-router-dom'


const UserOrders = () => {
    const ordersData = useSelector(state => state.orderData)
    const { order, loading, error } = ordersData
    // console.log(order?.data?.orders)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userId = localStorage.getItem('userId')
    useEffect(() => {
        dispatch(userOrderData(userId))
    }, [dispatch, userId])

    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || []
    useEffect(() => {
        if (!userInfo.userAvailable) {
            navigate("/")
        }
    }, [userInfo.userAvailable, navigate])

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <h3 className="text-4xl font-semibold text-gray-900 mb-6">Your Orders</h3>
            {loading && <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>Loading...</span></div>}
            {error && <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>failed to get your product</span></div>}
            {order?.data?.orders.length === 0 && "no orders"}
            <div className="scroll flex flex-col w-full">
                <table className="table">
                    <tr className="tr">
                        <th className="p-2">Product Names</th>
                        <th>Payment Mode</th>
                        <th>Paid</th>
                        <th>Delivery</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                    {
                        order?.data?.orders?.map((item, idx) => {
                            return (
                                <tr key={idx}>
                                    <td className="td p-2">{item?.orderItems?.map((elem, id) => {
                                        return (
                                            <span key={id} className="">{elem?.name}, </span>
                                        )
                                    })}</td>

                                    <td className="td">{item.payment}</td>
                                    <td className="td" style={{ color: item?.isPaid === false ? "red" : "green" }}>{item?.isPaid === false ? "False" : "True"}</td>
                                    <td className="td" style={{ color: item?.isPaid === false ? "red" : "green" }}>{item?.isDelivered === false ? "False" : "True"}</td>
                                    <td className="td">{item?.totalAmount}</td>
                                    <td className="td">{item.createdAt.slice(0, 10)}</td>
                                </tr>
                            )
                        })
                    }

                </table>
            </div>
        </div>
    )
}

export default UserOrders
