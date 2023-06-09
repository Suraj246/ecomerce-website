import React from "react";
import Ratings from "./Ratings";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct, getUpdateProductData } from "../../redux/actions/productActions";
import { apiEndpoint } from "../../API_ENDPOINT";

function ProductCart({ item }) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || []
  const navigate = useNavigate()
  // const singleProduct = useSelector(state => state.removeProduct)
  // console.log(singleProduct)
  const dispatch = useDispatch()

  const deleteSingleProduct = (id) => {
    console.log('deleteSingleProduct', id)
    dispatch(deleteProduct(id))
    window.location.reload()
  }

  const editSingleProduct = (elem) => {
    dispatch(getUpdateProductData(elem))
    navigate("/create-product")
  }

  return (
    <div className="product-info">
      <NavLink to={`/product/${item?._id}`} >
        <div className="product-img-container">
          {item?.img?.includes("jpeg") || item?.img?.includes("jpg") ?
            <img variant="top" src={item?.img} loading="lazy" className="img-product" alt={item?.name} />
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
      {userInfo?.adminAvailable &&

        <div className="flex justify-between items-center pl-4 pr-4">
          <span onClick={() => editSingleProduct(item)}>edit</span>
          <span onClick={() => deleteSingleProduct(item._id)}>delete</span>
        </div>
      }
    </div>
  );
}

export default ProductCart;
