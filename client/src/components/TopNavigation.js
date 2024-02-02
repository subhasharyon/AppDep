import React, { useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Login from './Login';
import Signup from './Signup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TopNavigation() {

    const [show, setShow] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

  const handleClose = () => setShow(false);
  const handleCloseMenu = () => setShowMenu(false);
  const handleShow = () => setShow(true);
  const handleShowMenu = () => setShowMenu(true);

  const [ isLoginView, setIsLoginView ] = useState(true);
  const [searchProduct, setSearchProduct] =useState([]);

  const cartCount = useSelector(state => state.cartCount);

  const searchInputRef = useRef();

  let navigate = useNavigate();
  let dispatch = useDispatch();

  const storeObj = useSelector((store) => store);

  const toggleView = () => {
    setIsLoginView((prev) => !prev);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({type: 'logout'});
    navigate('/');
  }

  

  const handleSearch = async () => {

    let response = await axios.get(`/searchProduct?search=${searchInputRef.current.value}`);
    console.log(response);

    if (response) {
      dispatch({
        type: 'search',
        data: response.data.data
      });
      navigate('/search');  
    }
};


const handleKeySearch = (e) => {

  if(e.key === 'Enter'){
    e.preventDefault();
    handleSearch();
  }


};

  return (
    <div>
      <div>
        <div>

        <FontAwesomeIcon icon={faBars} className='hamburger'onClick={handleShowMenu}/>
        </div>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className='container-fluid'>
        <Navbar.Brand href="#" className='logo'><Link to='/' className='links'>SmartStore.</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
        
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              ref={searchInputRef}
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
              onKeyPress={handleKeySearch}
            />
            <Button className='button2' variant="outline-success" onClick={handleSearch}>Search</Button>
          </Form>
        </Navbar.Collapse>
        <div className='icons'>
      <FontAwesomeIcon icon={faUser} onClick={handleShow}/>
      <Link to='/wishlist' className='iconlink'><FontAwesomeIcon icon={faHeart} /></Link>
      <Link to='/cart' className='iconlink'><FontAwesomeIcon icon={faCartShopping} /></Link>
      <span className='cartCount'>{cartCount}</span>
      </div>
      </Container>
     
      
    </Navbar>
    <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {storeObj && storeObj.userDetails ? 'Account Options': (isLoginView ? 'Login' : 'Regiser')}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <hr></hr>
        <Offcanvas.Body>
          {storeObj && storeObj.userDetails ? 
          (
            <ul>
             <Link to='/editProfile' className='links'><li>Edit Profile</li></Link>
              <Link to='/editProfile' className='links'><li>Delete Account</li></Link>
              <Link to='/orders' className='links'><li>My Orders</li></Link>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          ) : 
          (
            isLoginView ? <Login onRegisterClick={toggleView}/> : <Signup onLoginClick={toggleView}/>
          )
          }
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas show={showMenu} onHide={handleCloseMenu}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Categories</Offcanvas.Title>
        </Offcanvas.Header>
        <hr></hr>
        <Offcanvas.Body>
        <Link to={`/products/${encodeURIComponent('smart speaker')}`} className='dlink'><p>Smart Speakers</p></Link>
    <Link to={`/products/${encodeURIComponent('smart bulb')}`} className='dlink'><p>Smart Bulbs</p></Link>
          <Link to={`/products/${encodeURIComponent('cctv')}`} className='dlink'><p>Smart CCTV</p></Link>
          <Link to={`/products/${encodeURIComponent('smart purifier')}`} className='dlink'><p>Smart Air Purifier</p></Link>
          <Link to={`/products/${encodeURIComponent('smart ac')}`} className='dlink'><p>Smart AC</p></Link>
          <Link to={`/products/${encodeURIComponent('projector')}`} className='dlink'><p>Projectors</p></Link>
          <Link to={`/products/${encodeURIComponent('smart tv')}`} className='dlink'><p>Smart TV</p></Link>
          <Link to={`/products/${encodeURIComponent('thermostat')}`} className='dlink'><p>Smart Thermostat</p></Link>
          <Link to={`/products/${encodeURIComponent('smart cooker')}`} className='dlink'><p>Smart Cooker</p></Link>
          <Link to={`/products/${encodeURIComponent('smart vacuum cleaner')}`} className='dlink'><p>Smart Vacuum Cleaner</p></Link>
          <Link to={`/products/${encodeURIComponent('smart plug')}`} className='dlink'><p>Smart Plugs</p></Link>
          <Link to={`/products/${encodeURIComponent('air dresser')}`} className='dlink'><p>Air Dresser</p></Link>
          <Link to={`/products/${encodeURIComponent('door bell')}`} className='dlink'><p>Smart Video Door Bells</p></Link>
        </Offcanvas.Body>
      </Offcanvas>
      </div>
       
    </div>
  )
}

export default TopNavigation