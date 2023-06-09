import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/actions/userAction";

const LogIn = () => {
    const userData = useSelector(state => state.userSignIn)
    const { loading, error, userInfo } = userData

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [input, setInput] = useState({ email: "", password: "" });

    if (userInfo) {
        navigate('/')
    }


    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!input.email || !input.password) {
            alert("Please enter a valid email or password")
            return
        }

        dispatch(userLogin(input))

    };

    return (
        <div className="flex justify-center items-center " style={{ height: '70vh' }}>
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3 p-5 w-2/6 lg:w-4/6 md:w-full">
                <span className="text-2xl text-gray font-bold text-center">Enter Login Details</span>
                {error && <span className="text-red-700 font-bold text-lg capitalize">{error}</span>}
                <div className="flex flex-col py-1 text-gray-400 text-lg">
                    <label htmlFor="email" className="text-gray-800">Email Address</label>
                    <input
                        type="email"
                        className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                        name="email"
                        placeholder="Email"
                        autoComplete="off"
                        value={input.email}
                        onChange={inputHandler}
                    />

                </div>
                <div className="flex flex-col py-2 text-gray-400 text-lg">
                    <label htmlFor="password" className="text-gray-800">Password</label>
                    <input
                        type="password"
                        className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                        placeholder="Password"
                        name="password"
                        autoComplete="off"
                        value={input.password}
                        onChange={inputHandler}
                    />
                </div>

                {/* <NavLink to="" className="font-bold">Forget Password? </NavLink> */}
                {loading ?
                    <button className="flex items-center justify-center w-full my-1 py-2 bg-teal-500 shadow-lg shadow-teal-700/60 rounded-lg text-white font-semibold">
                        <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="font-medium"> Processing... </span>
                    </button>
                    :
                    <button className="w-full my-1 py-2  bg-teal-500 shadow-lg shadow-teal-700/60 rounded-lg text-white font-semibold">Login</button>
                }
                <div className="w-full">
                    <span className="font-bold">Don't have an account ?</span>
                    <NavLink to="/signup" className="text-blue-900 font-semibold"> Sign Up</NavLink>
                </div>
            </form>
        </div>
    )
}

export default LogIn
