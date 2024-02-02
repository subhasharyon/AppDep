import React from 'react';
import { useSelector } from 'react-redux';
import TopNavigation from './TopNavigation';

function Orders() {
    const orderDetails = useSelector((store) => store.users[store.userDetails]?.orderDetails);

    return (
        <div>
            <TopNavigation />
            <div>
                <h2 style={{ position: 'relative', top: '100px', left: '3%' }}>Order Details</h2>
            </div>
            <div className='orderDetailsDiv'>
                {orderDetails && orderDetails.cartItems && (
                    <div className='ordersDiv'>
                        {orderDetails.cartItems.map((item, index) => (
                            <div key={index}>
                                <h6 style={{width:'75%', position:'relative',top:'10px', fontWeight:'bolder'}}>{item.name}</h6>
                                <h6 style={{position:'relative',top:'20px'}}>₹{item.price}</h6>
                                <img src={item.image} className='orderDetailsImg' alt={item.name} />
                                <div className='deliveryDetails'>
                            <h5 className='deliveryDetails2'>Delivery Address</h5>
                            <div className='deliveryDetails2'>
                            <h6>{orderDetails.address}</h6>
                            <h6>{orderDetails.city}</h6>
                            <h6>{orderDetails.pincode}</h6>
                            <h6>{orderDetails.landmark}</h6>
                            <h6>{orderDetails.phoneNumber}</h6>
                            </div>
                        </div>
                                <hr />
                            </div>
                        ))}
                    </div>
                )}
                {orderDetails && orderDetails.productDetails && (
                    <div >
                        <h6 style={{width:'75%', position:'relative',top:'10px'}}>{orderDetails.productDetails.name}</h6>
                        <h6>₹{orderDetails.productDetails.price}</h6>
                        <img src={`/${orderDetails.productDetails.image}`} className='orderDetailsImg' alt={orderDetails.productDetails.name} />
                        <div className='deliveryDetails'>
                            <h5>Delivery Address</h5>
                            <h6>{orderDetails.address}</h6>
                            <h6>{orderDetails.city}</h6>
                            <h6>{orderDetails.pincode}</h6>
                            <h6>{orderDetails.landmark}</h6>
                            <h6>{orderDetails.phoneNumber}</h6>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;
