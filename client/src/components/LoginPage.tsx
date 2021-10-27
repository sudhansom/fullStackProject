import React, {useState} from 'react'
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import image from '../images/abc.png'
import jwt_decode from 'jwt-decode'
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'

type Response = {
  token: string
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
        <div className="App">
            <h4>Register</h4>
            <Form>
              <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>First Name: </Form.Label>
                                    <Form.Control type="text" />
                                </Col>
                                <Col>
                                    <Form.Label>Last Name: </Form.Label>
                                    <Form.Control type="text" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Email: </Form.Label>
                                    <Form.Control type="text" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Password </Form.Label>
                                    <Form.Control type="text" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Repeat Password </Form.Label>
                                    <Form.Control type="text" />
                                </Col>
                            </Row>
                           
                              <Button style={{margin:"1em"}} type="submit" size="lg">Register</Button>
              

                              <GoogleLogin 
                              clientId="446627249737-sj7pmkvsibbf16vkhrsaqqt3kmi42n7j.apps.googleusercontent.com"
                              buttonText="Login"
                              onSuccess={responseGoogle}
                              onFailure={responseGoogle}
                              cookiePolicy={'single_host_origin'}
                          />
                            
            </Form.Group>
            </Form>
          </div>
    )
}
export default LoginPage