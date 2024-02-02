import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { PersistGate } from 'redux-persist/integration/react';

let initialStore = {
  userDetails: null,
  users: {},
  cartCount: 0,
  cartItems: [],
  searchResults: [],
  orders: [],
  productDetails: null,
  orderDetails: {},
}

let reducer = (latestStore = initialStore, dispatchedObj) => {
  switch (dispatchedObj.type) {
    case 'login':
      let cartCount = 0;
      if (dispatchedObj.data.name) { 
        const userId = dispatchedObj.data.name;
        const user = latestStore.users[userId] || { cartItems: [] };
        cartCount = user.cartItems.reduce((count, item) => count + item.quantity, 0);
      }
      return { ...latestStore, userDetails: dispatchedObj.data.name, cartCount: cartCount };
    
    case 'logout':
      return { ...latestStore, userDetails: null, cartCount: 0 }; 
      case 'addToCart':
  if (latestStore.userDetails) {
    const userId = latestStore.userDetails;
    const user = latestStore.users[userId] || { cartItems: [] };
    const existingItemIndex = user.cartItems.findIndex(item => item._id === dispatchedObj.data._id);

    const updatedCartItems = existingItemIndex !== -1
      ? user.cartItems.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...user.cartItems, { ...dispatchedObj.data, quantity: 1 }];

    const updatedUsers = {
      ...latestStore.users,
      [userId]: { ...user, cartItems: updatedCartItems }
    };

   const cartCount = updatedCartItems.reduce((count, item) => count + item.quantity, 0);

    return { ...latestStore, users: updatedUsers, cartCount };
  }
  return latestStore;
      
  case 'updateItemQuantity':
    const { itemId, changeQuantity } = dispatchedObj.data;
    if (latestStore.userDetails) {
      const userId = latestStore.userDetails;
      const user = latestStore.users[userId] || { cartItems: [] };
      const updatedCartItems = user.cartItems.map(item =>
        item._id === itemId ? { ...item, quantity: Math.max(0, item.quantity + changeQuantity) } : item
      ).filter(item => item.quantity > 0);
  
      const updatedUsers = {
        ...latestStore.users,
        [userId]: { ...user, cartItems: updatedCartItems }
      };
  
      const cartCount = updatedCartItems.reduce((count, item) => count + item.quantity, 0);
  
      return { ...latestStore, users: updatedUsers, cartCount };
    }
    return latestStore;
  
      case 'search':
        return {
          ...latestStore, searchResults: dispatchedObj.data
        }
        case 'wishlist':
      if (latestStore.userDetails) {
        const userId = latestStore.userDetails;
        const { data: wishlistItem } = dispatchedObj;
        const user = latestStore.users[userId] || { wishlistItems: [] };
        const updatedWishlistItems = [...user.wishlistItems, wishlistItem];
        const updatedUsers = { ...latestStore.users, [userId]: { ...user, wishlistItems: updatedWishlistItems } };
        return { ...latestStore, users: updatedUsers };
      }
      return latestStore;
    
        case 'delete':
          if (latestStore.userDetails) {
            const userId = latestStore.userDetails;
            const { data: productToDelete } = dispatchedObj;
            const user = latestStore.users[userId] || { wishlistItems: [] };
            const updatedWishlistItems = user.wishlistItems.filter(item => item._id !== productToDelete._id);
            const updatedUsers = { ...latestStore.users, [userId]: { ...user, wishlistItems: updatedWishlistItems } };
            return { ...latestStore, users: updatedUsers };
          }
          return latestStore;
          case 'productPrice':
            return { ...latestStore, productDetails: dispatchedObj.data, cartItems: [] };
          case 'placeOrder':
            return { ...latestStore, cartItems: [...dispatchedObj.data], productDetails:null };
            case 'orderDetails':
  if (latestStore.userDetails) {
    const userId = latestStore.userDetails;
    const updatedUser = {
      ...latestStore.users[userId],
      orderDetails: dispatchedObj.data
    };
    return {
      ...latestStore,
      users: {
        ...latestStore.users,
        [userId]: updatedUser
      }
    };
  }
  return latestStore;
    default:
      return latestStore;
  }
};



const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();