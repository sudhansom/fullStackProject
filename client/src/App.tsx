import React from 'react';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'

type Response = {
  token: string
}

function App() {
 
  const responseGoogle = async (response: any) => {
  console.log('Response from google: -- ',response.tokenId)
  const tokenId = response.tokenId
  const result = await axios.post<Response>('http://localhost:5000/api/v1/google/login', {id_token: tokenId})
  console.log(result.data.token)
  localStorage.setItem('token', JSON.stringify(result.data.token))
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
  <div>
    <h3>Select a product</h3>
    <img src="../client/images/abc.png" height="40px" width="40px" alt="watch"></img>
  </div>
    </div>
  );
}

export default App;
