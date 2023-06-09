import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { allOrders } from '../../redux/actions/orderAction'
import "./admin.css"
const Successful = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ordersData = useSelector(state => state.allOrders)
    const { order, loading, error } = ordersData
    const completedData = order?.orders?.filter((item) => {
        return item.isPaid && item.isDelivered
    })

    useEffect(() => {
        dispatch(allOrders())
    }, [dispatch])

    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || []
    useEffect(() => {
        if (!userInfo.adminAvailable) {
            navigate("/")
        }
    }, [userInfo.adminAvailable, navigate])

    return (
        <div className="flex flex-col  w-full">
            <h3 className="text-4xl font-semibold text-gray-900 mb-6">Completed Orders</h3>
            <div className="flex flex-col gap-4 border-5 w-full">
                {completedData?.length === 0 && <span>No orders found</span>}

                {loading ?
                    <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>Loading...</span></div> : error ?
                        <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>failed to get product details</span></div> :
                        <div className="scroll flex flex-col w-full ">
                            <table className="table">
                                <thead>
                                    <tr className="tr">
                                        <th>Customer Name</th>
                                        <th>Products</th>
                                        <th>Shipping Address</th>
                                        <th>Phone</th>
                                        <th>Total Amount</th>
                                        <th>Paid</th>
                                        <th>Delivered</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        completedData?.map((item, idx) => {
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
                                                    <td className="td"><button style={{ backgroundColor: item?.isPaid === false ? "red" : "green" }} className="pt-1 pb-1 pl-3 pr-3 rounded-full text-white">{item?.isPaid === false ? "False" : "True"}</button></td>
                                                    <td className="td"><button style={{ backgroundColor: item?.isDelivered === false ? "red" : "green" }} className="pt-1 pb-1 pl-3 pr-3 rounded-full text-white">{item?.isDelivered === false ? "False" : "True"}</button></td>
                                                    <td className="td">{item?.createdAt.slice(0, 10)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>

                            </table>


                        </div>
                }
            </div>
        </div>
    )
}

export default Successful
