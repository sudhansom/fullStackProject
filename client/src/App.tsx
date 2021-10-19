import React, {useState} from 'react';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'

function App() {
  const [gButton, setgButton] = useState('flex')
  const responseGoogle = async (response: any) => {
  console.log('Response from google: -- ',response.tokenId)
  const tokenId = response.tokenId
  await axios.post('http://localhost:5000/api/v1/google/login', {id_token: tokenId})
  console.log(response.user)
}
  return (
    <div className="App">
      <h1>Hello world...</h1>
      <GoogleLogin style={{display:gButton}}
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
