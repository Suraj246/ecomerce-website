import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers } from '../../redux/actions/userAction'
import { NavLink, useNavigate } from 'react-router-dom'
const AllUsers = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ordersData = useSelector(state => state.users)
    const { usersData, loading, error } = ordersData

    useEffect(() => {
        dispatch(allUsers())
    }, [dispatch])
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || []
    useEffect(() => {
        if (!userInfo.adminAvailable) {
            navigate("/")
        }
    }, [userInfo.adminAvailable, navigate])
    return (

        <div className="flex flex-col justify-center items-center w-full">

            <h3 className="text-4xl font-semibold text-gray-900 mb-6">Users</h3>
            <div className="flex flex-col gap-4 border-5 w-full p-9">
                {loading && <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>Loading...</span></div>}
                {error && <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>failed to get userData</span></div>}
                {usersData?.length === 0 && "no orders"}
                <table className="table-auto bg-gray-100">
                    <thead>
                        <tr>
                            <th className="p-4">User Names</th>
                            <th>email</th>
                            <th>Total Orders</th>
                            {/* <th>Date</th> */}
                        </tr>
                    </thead>
                    <tbody >
                        {
                            usersData?.map((item, idx) => {
                                return (
                                    <tr className="p-4" key={idx}>
                                        <td className="pl-6 pr-4 pb-4">
                                            <NavLink to={`/customer/${item._id}`}>
                                                {item?.name}
                                            </NavLink>
                                        </td>
                                        <td>{item?.email}</td>
                                        <td>{item?.orders?.length}</td>
                                        {/* <td>{item.createdAt.slice(0, 10)}</td> */}
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default AllUsers
