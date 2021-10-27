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
type Fields = {
  email: string,
  password: string
}


function LoginPage(){
  const [emails, setEmail] = useState<Fields>({
    email: '',
    password: '',
  })
  //const [password, setPassword] = useState<string |null>('')
  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = {...emails}
    values.email = e.target.value
    setEmail(values)
  }
  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = {...emails}
    values.password = e.target.value
    setEmail(values)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const users = await axios.post<any>('http://localhost:5000/api/v1/users/login', emails)
    console.log('values:',emails.email, emails.password)
  }
    return (
        <div className="App">
            <h4>Login</h4>
            <Form onSubmit={handleSubmit}> 
              <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>Email: </Form.Label>
                                    <Form.Control type="text" onChange={updateEmail} value={emails.email}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Password </Form.Label>
                                    <Form.Control type="text"  onChange={updatePassword} />
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