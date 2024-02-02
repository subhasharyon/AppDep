import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import TopNavigation from "./TopNavigation";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    //   <button
    //   type="button"
    //   onClick={decoratedOnClick}
    //   className='accRadio'
    // >
    //     {children}
    //   </button>
    <button type="button" className="accBtn" onClick={decoratedOnClick}>
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        ></path>
      </svg>
    </button>
  );
}

function PlaceOrder() {
  const [showInput, setShowInput] = useState(false);

  const [upiId, setUpiId] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');

  const productDetails = useSelector((store) => store.productDetails);
  const cartItems = useSelector((store) => store.cartItems);

  const [showNotification, setShowNotification] = useState(false);

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUpiId(value);
    setIsValid(validateUpiId(value));
  };

  const validateUpiId = (id) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
    return regex.test(id);
  };

  let dispatch = useDispatch();

  // const parsedProductPrice =
  //   typeof productPrice === "string"
  //     ? parseFloat(productPrice.replace(",", ""))
  //     : productPrice;

  // const parsedOrders = typeof price.price === "string" ? parseFloat(price.price.replace(',','')) : price;

  //  const delivery = parsedOrders > 1199 ? 0 : 100;

  let totalAmount = 0;
    if (cartItems.length > 0) {
        totalAmount = cartItems.reduce((total, item) => {
            return total + parseFloat(item.price.replace(",", "")) * item.quantity;
        }, 0);
    } else if (productDetails) {
        totalAmount = parseFloat(productDetails.price.replace(",", ""));
    }

     const delivery = totalAmount > 1199 ? 0 : 100;

     const handleCheckOut = () => {

      const orderDetails = {

        fullName,
        phoneNumber,
        pincode,
        address,
        landmark,
        city,
        cartItems,
        productDetails,

      }
      console.log(orderDetails);
      
      dispatch({type: 'orderDetails', data: orderDetails});

      setShowNotification(true);

     };
  

  return (
    <div>
      <div>
        <TopNavigation />
      </div>
      <div className={showNotification ? "blur-background" : ""}>
      <Accordion defaultActiveKey="0" className="accordian">
        <Card className="accCard">
          <Card.Header className="accHeader">
            <CustomToggle eventKey="0">
              <span className="accSpan">Delivery Address</span>
            </CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="accInputs">
                <input className="accInput"
                 placeholder="Full Name"
                 value={fullName}
                 onChange={(e)=> setFullName(e.target.value)}
                ></input>
                <input className="accInput"
                 placeholder="Mobile Number"
                 value={phoneNumber}
                 onChange={(e) => setPhoneNumber(e.target.value)}
                 ></input>
                <input
                  className="accInput"
                  placeholder="pincode- 6 Digits"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                ></input>
                <input className="accInput"
                 placeholder="Address"
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
                ></input>
                <input className="accInput"
                 placeholder="Landmark"
                 value={landmark}
                 onChange={(e) => setLandmark(e.target.value)}
                 ></input>
                <input className="accInput"
                 placeholder="Town/City"
                 value={city}
                 onChange={(e) => setCity(e.target.value)}
                 ></input>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <CustomToggle eventKey="1">Payment Option</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <div>
                <div className="visa-card">
                  <div className="logoContainer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="23"
                      height="23"
                      viewBox="0 0 48 48"
                      className="svgLogo"
                    >
                      <path
                        fill="#ff9800"
                        d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                      ></path>
                      <path
                        fill="#d50000"
                        d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                      ></path>
                      <path
                        fill="#ff3d00"
                        d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                      ></path>
                    </svg>
                  </div>
                  <div className="number-container">
                    <label className="input-label" for="cardNumber">
                      CARD NUMBER
                    </label>
                    <input
                      className="inputstyle"
                      id="cardNumber"
                      placeholder="XXXX XXXX XXXX XXXX"
                      name="cardNumber"
                      type="text"
                    />
                  </div>

                  <div className="name-date-cvv-container">
                    <div className="name-wrapper">
                      <label className="input-label" for="holderName">
                        CARD HOLDER
                      </label>
                      <input
                        class="inputstyle"
                        id="holderName"
                        placeholder="NAME"
                        type="text"
                      />
                    </div>

                    <div className="expiry-wrapper">
                      <label className="input-label" for="expiry">
                        VALID THRU
                      </label>
                      <input
                        className="inputstyle"
                        id="expiry"
                        placeholder="MM/YY"
                        maxLength="4"
                        type="text"
                      />
                    </div>
                    <div className="cvv-wrapper">
                      <label className="input-label" for="cvv">
                        CVV
                      </label>
                      <input
                        className="inputstyle"
                        placeholder="***"
                        maxlength="3"
                        id="cvv"
                        type="password"
                      />
                    </div>
                  </div>
                </div>
                <hr></hr>
                <div>
                  <input
                    type="radio"
                    style={{ cursor: "pointer" }}
                    id="upi"
                    onClick={handleShowInput}
                  ></input>
                  <label
                    style={{
                      marginLeft: "5px",
                      cursor: "pointer",
                      fontSize: "medium",
                      fontWeight: "600",
                    }}
                    name="upi"
                    for="upi"
                  >
                    Other UPI Apps
                  </label>
                </div>
                {showInput && (
                  <div>
                    <div>
                      <label
                        style={{
                          marginRight: "10px",
                        }}
                      >
                        Please enter your UPI ID
                      </label>
                    </div>
                    <input
                      type="text"
                      value={upiId}
                      onChange={handleInputChange}
                      placeholder="Enter your UPI ID"
                      pattern="/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/"
                      title="Enter a valid UPI ID"
                      className="accInput"
                    />
                    {!isValid && (
                      <h6 style={{ color: "red", fontSize: "small" }}>
                        Please enter a valid UPI ID
                      </h6>
                    )}
                  </div>
                )}
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
        <Card.Header>
          <CustomToggle eventKey="2">Items and Delivery</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            <div>
            {productDetails && (
          <div>
            <img src={`/${productDetails.image}`} className="placeOrderImg"></img>
            <h6>{productDetails.name}</h6>
            <h6>₹{productDetails.price}</h6>
            <h6>{productDetails.quantity}</h6>
          </div>
        )}
        {cartItems.length > 0 && (
          <div>
            {cartItems.map((item, index) => (
              <div key={index}>
                <img src={item.image} className="placeOrderImg"></img>
                <h6>{item.name}</h6>
                <h6>₹{item.price}</h6>
              </div>
            ))}
          </div>
        )}
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      </Accordion>
      <div className="summaryDiv">
        <h5 className="summaryHead" style={{ margin: "10px" }}>Order Summary</h5>
        <div className="subSummaryDiv">
          <div className="pricediv">
            <h6>Price Details</h6>
          </div>
          <div className="pricediv">
          <h8>
              Items:
              <span
                className="amountspan"
                style={{ fontSize: "medium", fontWeight: "600" }}
              >
                ₹{totalAmount}
              </span>
            </h8>
          </div>
          <div className="pricediv">
            { cartItems ? (
              <h8>
              Delivery:
              <span
                style={{
                  position: "relative",
                  left: "62%",
                  fontSize: "medium",
                }}
              >
                ₹{delivery}
              </span>
            </h8>
            ) : (
              <h8>
              Delivery:
              <span
                style={{
                  position: "relative",
                  left: "62%",
                  fontSize: "medium",
                }}
              >
                ₹{delivery}
              </span>
            </h8>
            )}
          </div>
          <br />
          <hr style={{ width: "90%", position: "relative", left: "20px" }}></hr>
          <div className="pricediv">
          <h5
              style={{
                position: "relative",
                bottom: "30px",
                color: "#c84747 ",
              }}
            >
              Order Total
              <span style={{ position: "relative", left: "40%" }}>
                ₹{totalAmount}
              </span>
            </h5>
          </div>
          <hr style={{ width: "90%", position: "relative", left: "20px" }}></hr>
          <button className="placeOrderBtn" onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
      
      </div>
     <div className="successMsg">
     {showNotification && (
        <div className="notifications-container">
          <div className="success">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="succes-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="success-prompt-wrap">
                <h3 className="success-prompt-heading">Order completed</h3>
                <div className="success-prompt-prompt">
                  <h3 style={{fontWeight:'250'}}>
                    You're happy now? Does this impulsive action is really
                    going to satisfy you? Don't answer me, answer yourself.
                    Anyway, continue your Shopping, Thank You.😊
                  </h3>
                </div>
                <div class="success-button-container">
                  <Link to='/orders'><button type="button" className="success-button-main">
                    View status
                  </button></Link>
                  <button
                    type="button"
                    className="success-button-secondary"
                    onClick={() => setShowNotification(false)} 
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
     </div>
    </div>
  );
}

export default PlaceOrder;
