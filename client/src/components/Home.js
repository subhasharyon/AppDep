import React, { useEffect, useState } from 'react';
import TopNavigation from './TopNavigation';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function Home() {

  const [randomProducts, setRandomProducts] = useState([]);
  const [alexa, setAlexa] = useState([]);

 
  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const response = await axios.get('/randomProducts');
        setRandomProducts(response.data.data); 
      } catch (error) {
        console.error('Error fetching random products:', error);
      }
    };

    const fetchSpeakers = async () => {
      try {
        let response = await axios.get('/alexa');
        console.log(response);
        setAlexa(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSpeakers();

    fetchRandomProducts();
  }, []);
  
  return (
    <div>
        <TopNavigation/>
        <div>
        <Carousel data-bs-theme="dark">
      <Carousel.Item>
       <Link to={`/products/smart speaker`}>
       <img
          className="d-block w-100"
          src="./images/banner4.jpg"
          alt="First slide"
        /></Link>
        <Carousel.Caption>
          <h5>Amazon alexa</h5>
          <h6>Smart living made simple with Alexa's touchless magic.</h6>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
       <Link to={`/products/smart plug`}>
       <img
          className="d-block w-100"
          src="./images/banner3.jpeg"
          alt="Second slide"
        /></Link>
        <Carousel.Caption>
        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Link to={`/products/thermostat`}>
        <img
          className="d-block w-100"
          src="./images/banner4.png"
          alt="Third slide"
        /></Link>
        <Carousel.Caption>
        <h5>Nest</h5>
          <h6>
          Elevate your home's comfort with Google Nest Thermostat.
          </h6>
        {/* <h5>Wipro Smart Devices</h5>
          <p>Smart living, simplified by Wipro's innovative tech.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </div>
        <div>
          <h5 style={{height:'10px',
          position:'relative',
          top:'130px',
          left:'40px'
        }}>Best of Smart Devices</h5>
        <div className='randomProducts'>
          
           {randomProducts.map((item,index) => {
              return (
                <Link to={`/productDetails/${item._id}`} key={index} className='dlink'>
                  <div key={index} className='randomdiv'>
                  <img src={`/${item.image}`} alt={item.name} className='randomimg'></img>
                 <div className='randomDetails'>
                 <h8>{item.name.substring(0,20)}...</h8>
                  <h8>₹{item.price}</h8>
                  <h6 className='shopNow'>Shop Now!</h6>
                 </div>
                </div>
                </Link>
                
              )
            })}
           
        </div>
        </div>
        <div>
          <h5 style={{height:'10px',
          position:'relative',
          top:'130px',
          left:'40px'
        }}>Top Picks</h5>
        <div className='randomProducts'>
          
           {alexa.map((item,index) => {
              return (
                <Link to={`/productDetails/${item._id}`} key={index} className='dlink'>
                  <div key={index} className='randomdiv'>
                  <img src={`/${item.image}`} alt={item.name} className='randomimg'></img>
                 <div className='randomDetails'>
                 <h8>{item.name.substring(0,20)}...</h8>
                  <h8>₹{item.price}</h8>
                  <h6 className='shopNow'>Shop Now!</h6>
                 </div>
                </div>
                </Link>
              )
            })}
        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Home