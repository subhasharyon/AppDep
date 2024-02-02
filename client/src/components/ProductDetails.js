import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TopNavigation from './TopNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCreditCard, faL } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Footer from './Footer';

function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  
  const { productId } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store?.cartItems || []);

  let navigate = useNavigate();

  useEffect(() => {
    const handleProductDetails = async () => {
      try {
        let response = await axios.get(`/productDetails/${productId}`);
        setProductDetails(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    handleProductDetails();
  }, [productId]);

  const handleCart = () => {
    const existingCartItem = cartItems.find((item) => item._id === productDetails._id);

    if (existingCartItem) {
      dispatch({
        type: 'updateItemQuantity', 
        data: {
          itemId: productDetails._id,
          changeQuantity: 1,
        },
      });
    } else {
      dispatch({ type: 'addToCart', data: { ...productDetails, quantity: 1 } });
    }
  };

  const handlePlaceOrder = () => {
    dispatch({type:'productPrice', data: productDetails});
    navigate('/placeorder');
  };

  

  return (
    <div>
      <div>
        <TopNavigation />
      </div>
      <div className='pdbody'>
        {productDetails ? (
          <div className="product-details">
            <div className="product-image">
              <img src={`/${productDetails.image}`} alt={productDetails.name} className='productImage' />
            </div>
            <div className="product-info">
              <h6>{productDetails.name}</h6>
              <hr />
            </div>
            <div className="product-options">
              <div className="color-selection">
                <label>Color: <b>{productDetails.color}</b></label>
              </div>
              <br />
              <div className="price">
                <b>₹{productDetails.price}</b> Inclusive of all taxes
              </div>
              <hr/>
            </div>
            <button className='addtocartbtn' type='button' onClick={handleCart}>
              <span className="box">
                ADD TO CART <FontAwesomeIcon icon={faBagShopping} />
              </span>
            </button>
            <button className='addtocartbtn' onClick={handlePlaceOrder}>
              <span className="box">
                BUY NOW <FontAwesomeIcon icon={faCreditCard} />
              </span>
            </button>
            <div className="product-details-content">
              <h3>About the Product</h3><br />
              <h6>{productDetails.about_this_item}</h6>
            </div>
          </div>
        ) : 'Page Not Found'}
      </div>
      <Footer/>
    </div>
  );
}

export default ProductDetails;
