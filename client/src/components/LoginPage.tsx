import React, {useState} from 'react'
import { Link } from 'react-router-dom'
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
    return (
        <div className="App">
            <h4>Login</h4>
            <Form>
              <Form.Group>
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
                           
                            <Button style={{margin:"1em"}} type="submit" size="lg">Login</Button>
                                     
            </Form.Group>
            <a className="button" style={{listStyleType:'none'}} href={`/register/`}> Create User</a>
            </Form>
          </div>
    )
}
export default LoginPage