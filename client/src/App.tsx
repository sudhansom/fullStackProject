import React from 'react';

import './App.css';


import { Switch, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage'
import ShowProducts from './components/ShowProducts'
import AddProduct from './components/AddProduct'
import Footer from './components/Footer'
import Navbar from './components/Navbar';
import DetailPage from './components/DetailPage';
import HomePage from './components/HomePage';

function App() {
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
          <Route exact path = '/details/:productId'>
            <DetailPage />
          </Route>
        </Switch>
      <Footer />
    </div>
  );
  }

export default App;
