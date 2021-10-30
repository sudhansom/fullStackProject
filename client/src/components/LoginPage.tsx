import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"

import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import image from '../images/abc.png'
import jwt_decode from 'jwt-decode'
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'

import { getUser } from '../redux/action'

type Response = {
  token: string
}
type Fields = {
  [key: string]: string
}


function LoginPage(){
  const dispatch = useDispatch()
  const [loggedIn, setLoggedIn] = useState(false)
  const [fields, setFields] = useState<Fields>({
    email: '',
    password: '',
  })
  //const [password, setPassword] = useState<string |null>('')
  
  const updateFields = (e: React.ChangeEvent<HTMLInputElement>, val: string) => {
    const values = {...fields}
    values[val] = e.target.value
    setFields(values)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const url = 'http://localhost:5000/api/v1/users/login'
    //const users = await axios.post<any>('http://localhost:5000/api/v1/users/login', fields)
    dispatch(getUser(url, fields))
    if(localStorage.getItem('token') as string){
      //eslint-disable-next-line
      location.href = "/";
    }
    
  }
    return (
        <div className="App">
            <h4>Login</h4>
            <Form onSubmit={handleSubmit} > 
              <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>Email: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'email' )}} value={fields.email}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Password </Form.Label>
                                    <Form.Control type="text"  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'password' )}} value={fields.password} />
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