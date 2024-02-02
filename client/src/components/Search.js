import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopNavigation from './TopNavigation';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHeart } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';

function Search() {
  const searchResults = useSelector((store) => store?.searchResults || []);
  const cartItems = useSelector((store) => store?.cartItems || []);
  const dispatch = useDispatch();

  console.log('searchItems:', searchResults);

  const handleAddToCart = (device) => {
    const existingCartItem = cartItems.find(item => item._id === device._id);

    if (existingCartItem) {
      dispatch({
        type: 'updateQuantity',
        data: {
          itemId: device._id,
          changeQuantity: 1,
        }
      });
    } else {
      dispatch({
        type: 'addToCart',
        data: { ...device, quantity: 1 }
      });
    }
  };

  const handleWhishList = (device) => {
    
   dispatch({
    type: 'wishlist',
    data: device,
   })

  }

  return (
    <div>
      <TopNavigation />
      <div className='maincard'>
        {searchResults.map((device, index) => (
          <Link to={`/productDetails/${device._id}`} key={index} className='dlink'>
            <FontAwesomeIcon icon={faHeart}  className='wishlist' onClick={() => handleWhishList(device)}/>
            <div className="card-container">
              <div className="card-img">
                <div className="img">
                  <img src={`/${device.image}`} className='productimg' alt={device.name} />
                </div>
              </div>
              <div className="card-title">{device.name.substring(0, 22)}</div>
              <div className="card-subtitle">{device.about_this_item.substring(0, 44)}...</div>
              <hr className="card-divider" />
              <div className="card-footer">
                <div className="card-price"><span>₹</span>{device.price}</div>
                <button className="card-btn" type='button' onClick={() => handleAddToCart(device)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z"></path>
                    <path d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
                    <path d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
                    <path d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default Search;
