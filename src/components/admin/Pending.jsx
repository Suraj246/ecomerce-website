import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { allOrders, updateUserOrder, updateUserOrderIsDelivered } from '../../redux/actions/orderAction'
import "./admin.css"

const Pending = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ordersData = useSelector(state => state.allOrders)
    const { order, loading, error } = ordersData
    const [refresh, setRefresh] = useState(false)
    const pendingData = order?.orders?.filter((item) => {
        return item.isPaid === false || item.isDelivered === false ? item : null
    })

    useEffect(() => {
        dispatch(allOrders())
    }, [dispatch, refresh])

    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || []
    useEffect(() => {
        if (!userInfo.adminAvailable) {
            navigate("/")
        }
    }, [userInfo.adminAvailable, navigate])

    const btnIsPaidHandel = (item) => {
        const order = { orderId: item._id, isPaid: true }
        dispatch(updateUserOrder(order))
        setRefresh(!refresh)
    }

    const btnIsDeliveredHandel = (item) => {
        const order = { orderId: item._id, isDelivered: true }
        dispatch(updateUserOrderIsDelivered(order))
        setRefresh(!refresh)
    }

    return (
        <div className="flex flex-col  w-full">
            <h3 className="text-4xl font-semibold text-gray-900 mb-6">Pending Orders</h3>
            <div className="flex flex-col w-full">
                {pendingData?.length === 0 && <span>No orders found</span>}

                {loading ?
                    <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>Loading...</span></div> : error ?
                        <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>failed to get product details</span></div> :
                        <div className="scroll flex flex-col w-full">
                            <table className="table">
                                <tr className="tr">
                                    <th className="p-2">Customer Name</th>
                                    <th className="p-2">Products</th>
                                    <th className="p-2">Shipping Address</th>
                                    <th className="p-2">Phone</th>
                                    <th className="p-2">Total Amount</th>
                                    <th className="p-2">Paid</th>
                                    <th className="p-2">Delivered</th>
                                    <th className="p-2">Date</th>
                                </tr>
                                {
                                    pendingData?.map((item, idx) => {
                                        return (
                                            <tr key={idx} className='' >
                                                <td className="td">{item?.shippingAddress?.name}</td>
                                                <td className="td">{item?.orderItems?.map((elem, id) => {
                                                    return (
                                                        <div className="flex gap-4 " key={id}>
                                                            <span className="w-1/3">{elem?.name}</span>
                                                            <span>Quantity : {elem?.quantity}</span>
                                                            <span>Brand : {elem?.brand}</span>
                                                        </div>
                                                    )
                                                })}</td>
                                                <td className="td">{item?.shippingAddress?.address}</td>
                                                <td className="td">{item?.shippingAddress?.phone}</td>
                                                <td className="td">{item?.totalAmount}</td>
                                                <td className="td"><button onClick={() => btnIsPaidHandel(item)} style={{ backgroundColor: item?.isPaid === false ? "red" : "green" }} className="pt-1 pb-1 pl-3 pr-3 rounded-full text-white">{item?.isPaid === false ? "False" : "True"}</button></td>
                                                <td className="td"><button onClick={() => btnIsDeliveredHandel(item)} style={{ backgroundColor: item?.isDelivered === false ? "red" : "green" }} className="pt-1 pb-1 pl-3 pr-3 rounded-full text-white">{item?.isDelivered === false ? "False" : "True"}</button></td>
                                                <td className="td">{item?.createdAt.slice(0, 10)}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </table>


                        </div>
                }
            </div>
        </div>
    )
}

export default Pending
