import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    
        <footer className="footer">
            <h1 className='footerHeading'>SmartStore.</h1>
      <div className="container">
        <div className="row">
          <div className="linksDiv">
            <h5 style={{color:'white',marginLeft:'30px'}}>Company</h5>
            <ul>
              <Link to='/' className='footerlink'><li>Home</li></Link>
              <Link to='/aboutUs' className='footerlink'><li>About Us</li></Link>
              <Link to='/aboutUs' className='footerlink'><li>Contact Us</li></Link>
            </ul>
          </div>
          <div className="contactsDiv">
            <h3 style={{color:'white'}}>Contact</h3>
            <h6>Address: 123 Main Street, sanJose, California</h6>
            <h6>Email: smartstore@gmail.com</h6>
            <h6>Phone: +1234567890</h6>
          </div>
        </div>
      </div>
      <div className='footerlist'>
            <h5 style={{color:'white',position:'relative',left:'20px'}}>CATEGORIES</h5>
            <div className='footeritems'>
            <Link to={`/products/smart speaker`} className='footerlink'><li>Smart Speakers</li></Link>
            <Link to={`/products/smart bulb`} className='footerlink'><li>Smart Bulbs</li></Link>
            <Link to={`/products/cctv`} className='footerlink'><li>Smart cctv</li></Link>
            <Link to={`/products/smart purifier`} className='footerlink'><li>Smart Air Purifier</li></Link>
            <Link to={`/products/smart ac`} className='footerlink'><li>Smart AC</li></Link>
            <Link to={`/products/projector`} className='footerlink'><li>smart Projectors</li></Link>
            <Link to={`/products/smart tv`} className='footerlink'><li>Smart TV</li></Link>
            <Link to={`/products/thermostat`} className='footerlink'><li>Smart Thermostat</li></Link>
            <Link to={`/products/smart cooker`} className='footerlink'><li>Smart Cooker</li></Link>
            <Link to={`/products/vacuum cleaner`} className='footerlink'><li>Smart Vacuum Cleaner</li></Link>
            <Link to={`/products/smart plug`} className='footerlink'><li>Smart Plugs</li></Link>
            <Link to={`/products/air dresser`} className='footerlink'><li>Air Dresser</li></Link>
            <Link to={`/products/door bell`} className='footerlink'><li>Smart Door Bells</li></Link>
            </div>
          </div>
      <div className="footer-bottom">
        <div className="container">
          <p className='footerPara'>&copy; 2024 smartStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
    
  )
}

export default Footer