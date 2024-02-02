import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopNavigation from './TopNavigation';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function Wishlist() {

  const userDetails = useSelector((store) => store.userDetails);
  const users = useSelector(store => store.users);
  const userWishlistItems = userDetails ? users[userDetails]?.wishlistItems || [] : [];

  const dispatch = useDispatch();

  const handleDelete = (product) => {
      dispatch({
          type: 'delete',
          data: product,
      });
  };

  return (
      <div>
          <TopNavigation/>
          <h4 className='wishlistHeading'>Your Wishlist</h4>
          {userDetails ? ( 
              <div>
                  {userWishlistItems.length > 0 ? (
                      userWishlistItems.map((product, index) => (
                          <div key={index}>
                              <Link to={`/productDetails/${product._id}`} className='dlink'>
                                  <div className='wishlistMain'>
                                      <img src={product.image} alt={product.name} className='wishlistimg'/>
                                      <div className='wishlistsub'>
                                          <h5 style={{width:'85%'}}>{product.name}</h5>
                                          <h6>Price: ₹{product.price}</h6>
                                      </div>
                                  </div>
                              </Link>
                              <div>
                              <button className="deleteIcon" onClick={() => handleDelete(product)}>
  <svg viewBox="0 0 448 512" className="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
</button>
                              </div> 
                          </div>
                      ))
                  ) : (
                      <h2 style={{position:'relative',top:'100px'}}>Your wishlist is empty.</h2>
                  )}
              </div>
          ) : (
              <h2 className='whislistMsg'>Please log in to view your wishlist.</h2>
          )}
          <Footer/>
      </div>
  );
}

export default Wishlist;
