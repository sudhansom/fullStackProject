import React from 'react'

import image from '../images/abc.png'
import jwt_decode from 'jwt-decode'
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'

type Response = {
  token: string
}
const addItem = async () => {
  console.log('you bought me...')
  const foundUser = await axios.get(`http://localhost:5000/api/v1/users/${localStorage.getItem('id')}`)
  const order = foundUser.data as any
  console.log(foundUser)
  console.log(order.order)
  if(!order.order.length){
    // create orderItem and create order
    // insert order into user
    

  }else{
    // order already exists
    // if one of the order is incomplete, 
    // insert orderItem into that order
  }
}

function LoginPage(){
    const responseGoogle = async (response: any) => {
  console.log('Response from google: -- ',response.tokenId)
  const tokenId = response.tokenId
  const result = await axios.post<Response>('http://localhost:5000/api/v1/google/login', {id_token: tokenId})
  console.log('why this---',result.data.token)
  localStorage.setItem('token', result.data.token)
  const decoded = jwt_decode(result.data.token) as any
  console.log('decoded token: ', decoded.userData._id)
  localStorage.setItem('id',decoded.userData._id )
  console.log('your Id:',localStorage.getItem("id"))
  
  
}

    return (
        <div>
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
                <img src={image} height="40px" width="40px" alt="watch"></img>
            </div>
            <button onClick={addItem}>Add to cart</button>
        </div>
    )
}



export default LoginPage
