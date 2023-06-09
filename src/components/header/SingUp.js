import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios'
// import { useDispatch, useSelector } from "react-redux";
// import { userRegister } from "../../redux/actions/userAction";
import { apiEndpoint } from "../../API_ENDPOINT";


const SingUp = () => {
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    // const userData = useSelector(state => state.userRegister)
    // const { loading, error, userInfo } = userData
    // console.log(userInfo)

    const [input, setInput] = useState({ name: "", email: "", password: "" });
    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value })
    }
    const handleSubmit = async (event) => {
        const { name, email, password } = input;
        event.preventDefault();
        if (!input.email || !input.password || !input.name) {
            alert("empty box")
            return
        }


        try {
            await axios.post(
                `${apiEndpoint}/api/users/signup`,
                { name, email, password }
                // { withCredentials: true }
            )
                .then((res) => {
                    console.log(res)
                    if (res.status === 201) {
                        navigate("/login")
                    }
                })
        } catch (err) {
            if (err.response.status === 409) {
                alert("user already in use")
            }
            console.log(err);
        }
        // dispatch(userRegister(name, email, password))
        // navigate("/login")
    };
    return (
        <div className="flex justify-center items-center " style={{ height: '70vh' }}>
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3 p-5 w-2/6 lg:w-4/6 md:w-full">
                <span className="text-3xl text-gray font-bold text-center">Create Your Account</span>
                {/* {error && <span className="text-red-700 font-bold text-lg capitalize">{error}</span>} */}
                <div className="flex flex-col py-1 text-gray-400 text-lg">
                    <label className="text-gray-800" htmlFor="name">Enter Name</label>
                    <input
                        type="text"
                        className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                        name="name"
                        placeholder="enter your name"
                        autoComplete="off"
                        value={input.name}
                        onChange={inputHandler}
                    />
                </div>

                <div className="flex flex-col py-1 text-gray-400 text-lg">
                    <label className="text-gray-800" htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                        name="email"
                        placeholder="enter your email"
                        autoComplete="off"
                        value={input.email}
                        onChange={inputHandler}
                    />
                </div>

                <div className="flex flex-col py-1 text-gray-400 text-lg">
                    <label className="text-gray-800" htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                        placeholder="enter your Password"
                        name="password"
                        autoComplete="off"
                        value={input.password}
                        onChange={inputHandler}
                    />
                </div>

                <button className="w-full my-1 py-2 bg-teal-500 shadow-lg  rounded-lg text-white font-semibold">Sing Up</button>
                <div className="w-full">
                    <span className="font-bold">Already have an account ?</span>
                    <NavLink to="/login" className="text-blue-900 font-semibold"> Log In</NavLink>
                </div>
            </form>


        </div>
    )
}

export default SingUp
