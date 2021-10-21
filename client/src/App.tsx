import React from 'react';

import './App.css';


import { Switch, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage'
import ProductPage from './components/ProductPage'
import Navbar from './components/Navbar';
import AddProduct from './components/AddProduct'




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
