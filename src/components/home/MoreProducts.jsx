import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listProducts } from "../../redux/actions/productActions"
import { NavLink } from "react-router-dom";
import Ratings from './Ratings';
import { apiEndpoint } from '../../API_ENDPOINT';

const MoreProducts = ({ input }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { products, loading, err } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const name = location.search ? location.search.split("=")[1] : "fruits"
    const product = products?.filter((item) => item.category === name ? item : null)


    return (
        <>
            <button className="ml-4 pt-2 pb-2 pl-6 pr-6  bg-teal-500  rounded-lg text-white font-semibold"
                onClick={() => navigate(-1 || '/')}
            >
                Back
            </button>
            {loading ? <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>Loading...</span></div> : err ? <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>failed to fetch products</span></div> :
                <div className="all-product-info">

                    {product?.filter((elem) => {
                        if (input === elem) {
                            return elem;
                        } else if (elem.name.toLowerCase().includes(input)) {
                            return elem;
                        }
                        else {
                            return false;
                        }
                    })
                        .map((item, idx) => {
                            return (
                                <div className="product-info" key={idx}>
                                    <NavLink to={`/product/${item?._id}`} className="navlink">
                                        <div className="product-img-container">
                                            {item?.img?.includes("jpeg") || item?.img?.includes("jpg") ?
                                                <img src={item?.img} loading="lazy" className="img-product" alt={item?.name} />
                                                :
                                                <img variant="top" src={`${apiEndpoint}/uploads/${item?.img}`} loading="lazy" className="img-product" alt={item?.name} />
                                            }
                                        </div>
                                        <div className="flex flex-col p-2">
                                            <span className="text-sm capitalize font-semibold">{item?.name}</span>
                                            <span className="text-sm capitalize font-semibold">Rs. {item?.price}</span>

                                            <div>
                                                <span className="flex items-center">
                                                    <Ratings ratings={item?.ratings} />
                                                    {item?.ratings}
                                                </span>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            )
                        })}
                </div>
            }
        </>

    )
}

export default MoreProducts
