import React, { useState } from 'react'
import CheckOutSteps from './CheckOutSteps'
import { useDispatch } from 'react-redux'
import { savePayment } from '../../redux/actions/cartAction'
import { useNavigate } from 'react-router-dom'

const Payment = () => {
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState("cash on delivery")
    const navigate = useNavigate()

    const submitPayment = (e) => {
        e.preventDefault()
        dispatch(savePayment(paymentMethod))
        navigate("/order-summary")
    }
    return (
        <div>
            <CheckOutSteps step1 step2 />
            <div className="flex p-5 flex-col w-full border-3 items-center">
                <form className="flex flex-col p-5 w-2/4 xl:w-full" onSubmit={submitPayment}>
                    {/* <div className="flex items-center gap-3">
                        <input
                            type="radio"
                            value="PayPal"
                            name="paymentMethod"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className='cursor-pointer'
                        />
                        <label className="text-gray-800" htmlFor="PayPal">PayPal</label>
                    </div> */}
                    <div className="flex items-center gap-3">
                        <input
                            type="radio"
                            value="cash on delivery"
                            name="paymentMethod"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className='cursor-pointer'

                        />
                        <label className="text-gray-800" htmlFor="cash on delivery">Cash On Delivery</label>
                    </div>
                    <button className="w-full my-1 py-2 bg-orange-500 shadow-lg  rounded-lg text-white font-semibold"

                    >Continue</button>
                </form>
            </div>
        </div>
    )
}

export default Payment
