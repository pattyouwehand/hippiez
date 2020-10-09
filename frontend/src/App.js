import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <div className="logo-styles">
              <Link to="/">
                <img 
                  src="/images/logo-hippiez.png"
                  alt="logo"
                ></img></Link>
            </div>
          </div>
          <div className="menu-style">
            {/*<div className="category-menu">
              <Link 
                to="/category/Alle-categorien">
                  Alle categorieën{" "}
                  <img src="/images/icon-pointer.png" alt="pointer"></img>
              </Link>
            </div>*/}
            <div className="header-links">
              {userInfo ? (
              <Link to="/profile">Welkom {userInfo.name}</Link>
            ) : (
            <Link 
              to="/signin">
                <img src="/images/icon-user.png" alt="user"></img>
                Inloggen
            </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Bestellingen</Link>
                    <Link to="/products">Producten</Link>
                  </li>
                </ul>
              </div>
            )}
          <Link 
            to="/cart">
              <img 
                src="/images/icon-cart.png"  
                alt="cart">
              </img>
              Winkelmand
          </Link>
          </div>
         </div>
        </header>

        <main className="main">
          <div className="content">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>

        <footer className="footer">May Happiness Surround You</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
