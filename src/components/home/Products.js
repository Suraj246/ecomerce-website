import React, { useEffect } from "react";
import "./product.css";
import ProductCart from "./ProductCart";
import { useSelector, useDispatch } from 'react-redux'
import { listProducts } from "../../redux/actions/productActions"
import { NavLink } from "react-router-dom";

const Products = ({ input }) => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  // const s = useSelector(state => state)
  const { products, loading, err } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])


  const dairy = products?.filter((item) => item?.category === 'dairy' ? item : null)
  const fruits = products?.filter((item) => item?.category === 'fruits' ? item : null)
  const vegetables = products?.filter((item) => item?.category === 'vegetables' ? item : null)
  const meat = products?.filter((item) => item?.category === 'meat' ? item : null)

  return (
    <>
      {loading ? <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>Loading...</span></div> : err ? <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>failed to fetch products</span></div> :
        <>
          <div className="product-lists p-2">
            <div className="flex justify-between p-2">
              <h3 className="fs-5 py-1">Dairy Products</h3>
              <NavLink to="/more_products?=dairy" className="text-blue-900 underline">More</NavLink>
            </div>
            <div className="product">
              <div className="p">
                {dairy?.filter((elem) => {
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
                      <div key={idx} className="">
                        <ProductCart item={item} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>


          <div className="product-lists p-2 ">
            <div className="flex justify-between p-2">
              <h3 className="fs-5 py-1">Fruits</h3>
              <NavLink to="/more_products?=fruits" className="text-blue-900 underline">More</NavLink>
            </div>
            <div className="product">
              <div className="p">
                {fruits?.filter((elem) => {
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
                      <div key={idx}>
                        <ProductCart item={item} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="product-lists p-2 ">
            <div className="flex justify-between p-2">
              <h3 className="fs-5 py-1">Vegetables</h3>
              <NavLink to="/more_products?=vegetables" className="text-blue-900 underline">More</NavLink>
            </div>
            <div className="product">
              <div className="p">
                {vegetables?.filter((elem) => {
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
                      <div key={idx}>
                        <ProductCart item={item} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="product-lists p-2 ">
            <div className="flex justify-between p-2">
              <h3 className="fs-5 py-1">Meat and More</h3>
              <NavLink to="/more_products?=meat" className="text-blue-900 underline">More</NavLink>
            </div>
            <div className="product">
              <div className="p">
                {meat?.filter((elem) => {
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
                      <div key={idx}>
                        <ProductCart item={item} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      }

    </>

  );
};

export default Products;
