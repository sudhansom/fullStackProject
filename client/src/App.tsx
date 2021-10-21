import React from 'react';

import './App.css';


import { Switch, Route } from 'react-router-dom';

import LoginPage from './LoginPage'
import ProductPage from './ProductPage'
import Navbar from './Navbar';
import AddProduct from './AddProduct'




function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <LoginPage />
        </Route>
        <Route exact path='/addProduct/'>
          <AddProduct />
        </Route>
        <Route exact path = '/products/'>
          <ProductPage />
        </Route>
      </Switch>
    </div>
  );
  }

export default App;
