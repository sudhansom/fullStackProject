import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'

function App() {
  const responseGoogle = async (response: any) => {
  console.log('Response from google: -- ',response.tokenId)
  const tokenId = response.tokenId
  await axios.post('http://localhost:5000/api/v1/google/login', {id_token: tokenId})
}
  return (
    <div className="App">
      <h1>Hello world...</h1>
      <GoogleLogin
    clientId="446627249737-sj7pmkvsibbf16vkhrsaqqt3kmi42n7j.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
    </div>
  );
}

export default App;
