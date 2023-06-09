import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartItemLists, cartItemRemove } from "../../redux/actions/cartAction";
// import { useLocation } from "react-router-dom";
import { CART_ITEMS_SUCCESS } from "../../redux/constants/cartConstants";
import { useNavigate } from "react-router-dom";

const NavbarCart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector(state => state.cartItemList)
  const { cart, loading, error } = items

  // get quantity number from url
  // const params = useLocation()
  // const quantity = params.search ? Number(params.search.split("=")[1]) : 1


  const removeItem = (idx) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const id = userInfo.userId
    dispatch(cartItemRemove(id, idx))
    window.location.reload()
  }

  useEffect(() => {
    const data = { userId: localStorage.getItem('userId') }
    dispatch(cartItemLists(data))
  }, [dispatch]);




  const totalPrice = () => {
    const total =
      cart?.reduce(
        (acc, item) => acc + item?.price * item.quantity,
        0
      )
    return total
  }

  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || []
  useEffect(() => {
    if (!userInfo.userAvailable) {
      navigate("/")
    }
  }, [navigate, userInfo.userAvailable])

  const saveCart = () => {
    const saveCartData = {
      cart,
      totalPrice: totalPrice()
    }
    localStorage.setItem('saveCart', JSON.stringify(saveCartData))
    navigate('/shipping')
  }


  return (
    <div className="flex justify-center pt-5 ">

      <div className="w-4/6 flex flex-col gap-3 md:w-11/12 ">
        {loading && <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>Loading...</span></div>}
        {error && <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>failed to get your product</span></div>}
        {cart < 1 ? (
          <span className="text-center">
            Cart Is Empty
          </span>
        ) : (
          cart?.map((item, idx) => {
            return (
              <div className="flex gap-4 items-center w-full  shadow p-3 xl:flex-wrap xl:justify-center " key={idx}>

                {item?.img.includes("jpeg") || item?.img.includes("jpg") ?
                  <img src={item?.img} alt={item?.name} className="w-20 h-20" loading="lazy" />
                  :
                  <img src={`/uploads/${item?.img}`} className="w-20 h-20" loading="lazy" alt={item?.name} />
                }

                {/* <img src={item?.data?.img} alt={item?.data?.name} className="header-img" /> */}
                <div className="flex w-full items-center justify-around xl:flex-wrap xl:justify-center">
                  <div className="flex gap-2 items-center text-lg font-semibold w-2/6 xl:w-fit xl:flex-wrap xl:justify-center">
                    <span className="text-gray-800">{item?.name}</span>

                  </div>
                  <span className="font-semibold ">Rs.{item?.price}</span>
                  <div className="flex items-center gap-3">
                    <button
                      className="btn"
                      onClick={() => {
                        const data = cart?.map((elem, index) => {
                          return idx === index ? { ...elem, quantity: elem.quantity + 1 } : elem
                        })
                        dispatch({ type: CART_ITEMS_SUCCESS, payload: data })
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>

                    </button>

                    <span>{item.quantity}</span>
                    <button
                      className="btn"
                      onClick={() => {
                        const data = cart?.map((elem, index) => {
                          return idx === index ? { ...elem, quantity: elem.quantity === 1 ? 1 : elem.quantity - 1 } : elem
                        })
                        dispatch({ type: CART_ITEMS_SUCCESS, payload: data })

                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                      </svg>

                    </button>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 cursor-pointer" onClick={() => removeItem(idx)}>
                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                  </svg>

                </div>
              </div>
            );
          })
        )}
        <hr />
        <div className="flex justify-between gap-4 w-full">
          <span>
            <strong> Total Items : </strong>
            {cart?.length}
          </span>
          <span>
            <strong> Total Price : </strong>Rs.
            {totalPrice()}
          </span>
        </div>
        <div className="flex justify-end w-full">
          {cart?.length < 1 ? null
            :
            <button onClick={saveCart} className="bg-blue-500 pr-4 pl-4 pt-2 pb-2 rounded-full text-lg text-white capitalize cursor-pointer">proceed to checkout</button>
          }
        </div>
      </div>
    </div >
  );
};

export default NavbarCart;
