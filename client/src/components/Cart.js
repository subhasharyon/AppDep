import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TopNavigation from "./TopNavigation";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Cart() {
  const userDetails = useSelector((store) => store?.userDetails);
  const cartItems = useSelector((store) => userDetails ? store?.users[userDetails]?.cartItems || [] : []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [amount, setAmount] = useState(0);


  useEffect(() => {
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      const initialAmount = cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price.replace(',', '')); 
        return total + (itemPrice * item.quantity);
      }, 0);
      setAmount(initialAmount);
    } else {
      setAmount(0); 
    }
  }, [cartItems]); 

  const shippingCharges = amount > 1199 ? 0 : 100;  

  const totalAmount = amount + shippingCharges;

  const handleQuantityChange = (itemId, changeQuantity) => {
    dispatch({ type: 'updateItemQuantity', data: { itemId: itemId, changeQuantity: changeQuantity } });
  };

  const handleOrder = () => {
    dispatch({type:'placeOrder', data: cartItems});
    navigate('/placeorder');
  }

  

  return (
    <div>
      <TopNavigation />
      <div className="cartMain">
        <h3 className="cartheading">Your Cart</h3>
        {Array.isArray(cartItems) && cartItems.length > 0 ? (
          <div>
            <div className="cartContainer2">
              {cartItems.map((item, index) => (
                <div key={index} className="cartbody">
                  <div className="cartContainer">
                    <img src={`/${item.image}`} className="cartimg" alt={item.name} />
                  </div>
                  <div className="cartlist">
                    <h6 className="cartlistPara">{item.name}</h6>
                    <h6 className="cartlistPara">₹{item.price}</h6>
                    <h6>
                      <span className="cartcolor">color:</span>
                      {item.color}
                    </h6>
                    <h6>
                      <span id='qty'>Quantity:</span>
                      <button onClick={() => handleQuantityChange(item._id, -1)} className="cartbtn">-</button>
                      <span id='qty'>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item._id, 1)} className="cartbtn">+</button>
                    </h6>
                  </div>
                </div>
              ))}
            </div>
            <div className="summaryDiv">
              <h5 style={{margin:"10px"}} className="summaryHeading">Order Summary</h5>
              <div className="subSummaryDiv">
                <div className="pricediv">
                  <h6>Price Details</h6>
                </div>
                <div className="pricediv">
                  <h8>Amount <span className="amountspan">₹{amount}</span></h8>
                </div>
                <div className="pricediv">
                  <h8>Shipping Charges <span style={{position:"relative",left:"42%",fontSize:"medium"}}>₹{shippingCharges}</span></h8>
                </div>
                <br /><hr style={{width:"90%",position:"relative",left:"20px"}}></hr>
                <div className="pricediv">
                  <h5 style={{position:"relative",bottom:"30px"}}>Total Amount <span style={{position:"relative",left:"37%"}}>₹{totalAmount}</span></h5>
                </div>
                <hr style={{width:"90%",position:"relative",left:"20px"}}></hr>
                <button className="placeOrderBtn" onClick={handleOrder}>Place Order</button>
              </div>
            </div>
          </div>
        ) : (
          <h5 className='cartMsg'>Your cart is empty</h5>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default Cart;
