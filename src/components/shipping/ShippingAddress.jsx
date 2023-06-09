import React, { useState } from 'react'
import CheckOutSteps from './CheckOutSteps'
import { useDispatch } from 'react-redux'
import { saveShippingAddress } from '../../redux/actions/cartAction'
import { useNavigate } from 'react-router-dom'

const ShippingAddress = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userInfo = JSON.parse(localStorage.getItem('user')) || []
    const userAddress = JSON.parse(localStorage.getItem('shippingAddress')) || []
    // console.log(userAddress)
    const [input, setInput] = useState({ name: userAddress?.name ? userAddress?.name : userInfo?.userAvailable?.name, phone: "", address: "" })
    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if (!input.address || !input.phone || !input.name) {
            alert("empty field")
            return
        }
        navigate("/payment")
        dispatch(saveShippingAddress(input))

    }
    return (
        <div>
            <CheckOutSteps step1 />
            <div className="flex p-5 flex-col w-full border-3 items-center">
                <form className="flex flex-col p-5 w-2/4 xl:w-full" onSubmit={submitHandler}>
                    <div className="flex flex-col py-1 text-gray-400 text-lg">
                        <label className="text-gray-800" htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="rounded-lg bg-orange-100 mt-2 p-2 focus:border-blue-500 focus:bg-orange-200 focus:outline-none text-gray-800 text-lg"
                            name="name"
                            placeholder="enter your name"
                            autoComplete="off"
                            value={input.name}
                            onChange={inputHandler}
                        />
                    </div>

                    <div className="flex flex-col py-1 text-gray-400 text-lg">
                        <label className="text-gray-800" htmlFor="email">Contact</label>
                        <input
                            type="number"
                            className="rounded-lg bg-orange-100 mt-2 p-2 focus:border-blue-500 focus:bg-orange-200 focus:outline-none text-gray-800 text-lg"
                            name="phone"
                            placeholder="Enter Phone Number"
                            autoComplete="off"
                            value={input.phone}
                            onChange={inputHandler}
                        />
                    </div>

                    <div className="flex flex-col py-1 text-gray-400 text-lg">
                        <label className="text-gray-800" htmlFor="address">Delivery Address</label>
                        <input
                            type="text"
                            className="rounded-lg bg-orange-100 mt-2 p-2 focus:border-blue-500 focus:bg-orange-200 focus:outline-none text-gray-800 text-lg"
                            placeholder="Enter Your Delivery Address"
                            name="address"
                            autoComplete="off"
                            value={input.address}
                            onChange={inputHandler}
                        />
                    </div>

                    <button className="w-full my-1 py-2 bg-orange-500 shadow-lg  rounded-lg text-white font-semibold"

                    >Continue</button>
                </form>
            </div>
        </div>
    )
}

export default ShippingAddress
