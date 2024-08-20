import React, { useContext, useState,useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import {useNavigate} from "react-router-dom";
import "./PlaceOrder.css";
import { toast } from 'react-toastify';
import { assets } from '../../assets';
import axios from "axios";
const PlaceOrder = () => {

  const [payment, setPayment] = useState("cod")
  const [data, setData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: ""
  })

  const { getTotalPrice, token, food_lists, cartItems, url, setCartItems,currency,deliveryCharge } = useContext(StoreContext);

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
      const name = event.target.name
      const value = event.target.value
      setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (e) => {
      e.preventDefault()
      let orderItems = [];
      food_lists.map(((item) => {
          if (cartItems[item._id] > 0) {
              let itemInfo = item;
              itemInfo["quantity"] = cartItems[item._id];
              orderItems.push(itemInfo)
          }
      }))
      let orderData = {
          address: data,
          items: orderItems,
          amount: getTotalPrice() + deliveryCharge,
      }
      if (payment === "stripe") {
          let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
          if (response.data.success) {
              const { session_url } = response.data;
              window.location.replace(session_url);
          }
          else {
              toast.error("Something Went Wrong")
          }
      }
      else{
          let response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
          if (response.data.success) {
              navigate("/myorders")
              console.log(response.data);
              toast.success("Order Placed",{
                toastId:"success"
              })
              setCartItems({});
          }
          else {
              toast.error("Something Went Wrong")
          }
      }

  }

  useEffect(() => {
      if (!token) {
        toast.error('to place an order sign in first', {
            toastId: 'error',
        })
        //   toast.error("to place an order sign in first")
          navigate('/cart')
      }
      else if (getTotalPrice() === 0) {
          navigate('/cart')
      }
  }, [token])

  return (
    <form className='place-order' onSubmit={placeOrder}>
         <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
                <div className="multi-field">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
                </div>
                <div className="multi-field">
                    <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required />
                    <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
                </div>
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalPrice()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Delivery Fee</p><p>{currency}{getTotalPrice() === 0 ? 0 : deliveryCharge}</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Total</b><b>{currency}{getTotalPrice() === 0 ? 0 : getTotalPrice() + deliveryCharge}</b></div>
                    </div>
                    <div className="payment">
                    <h2>Payment Method</h2>
                    <div onClick={() => setPayment("cod")} className="payment-option">
                        <img src={payment === "cod" ? assets.checked : assets.un_checked} alt="" />
                        <p>COD ( Cash on delivery )</p>
                    </div>
                    <div onClick={() => setPayment("stripe")} className="payment-option">
                        <img src={payment === "stripe" ? assets.checked : assets.un_checked} alt="" />
                        <p>Stripe ( Credit / Debit )</p>
                    </div>
                </div>
                <button className='place-order-submit' type='submit'>{payment==="cod"?"Place Order":"Proceed To Payment"}</button>
                </div>
              </div>
    </form>
  )
}

export default PlaceOrder