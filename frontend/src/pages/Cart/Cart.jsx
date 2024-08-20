import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import "./Cart.css";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const {food_lists,cartItems,removeFromCart,getTotalPrice,deliveryCharge,currency,url} =  useContext(StoreContext);

//  console.log(food_lists);
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p><p>Title</p><p>Price</p><p>Quantity</p><p>Total</p> <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_lists.map((item,index)=>{
            if(cartItems[item._id] > 0){
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={url+"/images/"+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{currency}{item.price}</p>
                    <div>{cartItems[item._id]}</div>
                    <p>{currency}{item.price * cartItems[item._id]}</p>
                    <p className="cart-items-remove-icons" onClick={()=>removeFromCart(item._id)}>X</p>
                  </div>
                </div>
              )
            }
          })
        }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p><p>{currency}{getTotalPrice()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p><p>{currency}{getTotalPrice() === 0 ? 0:deliveryCharge}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b><b>{currency}{getTotalPrice()===0 ? 0 :getTotalPrice()+deliveryCharge}</b>
            </div>
          </div>
          <button onClick={()=>navigate("/order")}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code ,Enter it here

            </p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code ' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart