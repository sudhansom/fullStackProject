import React from 'react';

import './App.css';


import { Switch, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage'
import ShowProducts from './components/ShowProducts'
import Navbar from './components/Navbar';
import AddProduct from './components/AddProduct'
import Footer from './components/Footer'
import HeaderPart from './components/HeaderPart';
import DetailPage from './components/DetailPage';

function App() {
  return (
    <div>
      <Navbar />
      <HeaderPart />
      <Switch>
        <Route exact path='/'>
          <LoginPage />
        </Route>
        <Route exact path='/addProduct/'>
          <AddProduct />
        </Route>
        <Route exact path = '/products/'>
          <ShowProducts />
        </Route>
        <Route exact path = '/details/'>
          <DetailPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
  }

export default App;
