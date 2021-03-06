import React from 'react';
import {useSelector} from 'react-redux'

import './App.css';



import { Switch, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage'
import Register from './components/Register'
import ShowProducts from './components/ShowProducts'
import AddProduct from './components/AddProduct'
import Footer from './components/Footer'
import Navbar from './components/Navbar';
import DetailPage from './components/DetailPage';
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import BuyNow from './components/BuyNow'
import {Store} from './redux/reducers'




function App() {
  const isLoggedIn = useSelector((state: Store)=> state.userReducer.isLoggedIn)
  return (
    <div>
      <Navbar />
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/addProduct/'>
            <AddProduct />
          </Route>
          <Route exact path = '/products/'>
            <ShowProducts />
          </Route>
          <Route exact path = '/login/'>
            <LoginPage />
          </Route>
          <Route exact path = '/register/'>
            <Register />
          </Route>
          <Route exact path = '/details/:productId'>
            <DetailPage />
          </Route>
          <Route exact path = '/cartPage'>
            <CartPage />
          </Route>
          <Route exact path = '/buyNow'>
            {isLoggedIn?<BuyNow />:<LoginPage />}
            
          </Route>
        </Switch>
      <Footer />
    </div>
  );
  }

export default App;
