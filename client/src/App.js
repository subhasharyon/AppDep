import { useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import TopNavigation from './components/TopNavigation';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios';
import EditProfile from './components/EditProfile';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Search from './components/Search';
import Whishlist from './components/Whishlist';
import AboutUs from './components/AboutUs';
import PlaceOrder from './components/PlaceOrder';
import Orders from './components/Orders';

function App() {

  useEffect(()=>{
    axios.defaults.baseURL = '';
  },[]);
  
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/topnavigation' element={<TopNavigation/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/editProfile' element={<EditProfile/>}></Route>
    <Route path='/products/:category' element={<Products/>}></Route>
    <Route path='/productDetails/:productId' element={<ProductDetails/>}></Route>
    <Route path='/cart' element={<Cart/>}></Route>
    <Route path='/search' element={<Search/>}></Route>
    <Route path='/wishlist' element={<Whishlist/>}></Route>
    <Route path='/aboutUs' element={<AboutUs/>}></Route>
    <Route path='/placeorder' element={<PlaceOrder/>}></Route>
    <Route path='/orders' element={<Orders/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
