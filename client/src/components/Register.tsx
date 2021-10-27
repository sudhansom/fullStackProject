import React, {useState} from 'react'
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {UserDocument} from '../../../src/models/Users'

import image from '../images/abc.png'
import jwt_decode from 'jwt-decode'
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'
import { stringify } from 'querystring'

type Response = {
  token: string
}

type Fields = {
    [type: string] : string
}


function Register(){
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
    const [userFields, setUserFields] = useState<Fields>({
        firstName: '',
        lastName: '',
        email: '',
        password1: '',
        password2: '',
    })
    const handleForm = (e: React.ChangeEvent<HTMLInputElement>, attribute: string) => {
        const values = {...userFields}
        const value = attribute
        values[value] = e.target.value
        setUserFields(values)
    }
    const saveUser = async ()=>{
        console.log('registering....')
        // const newUser = {
        //     "firstName": userFields.firstName,
        //     "lastName": userFields.lastName,
        //     "email": userFields.email,
        //     "password": userFields.password1
        // }
        const result = await axios.post<any>('http://localhost:5000/api/v1/users/register', userFields)
        localStorage.setItem('token', JSON.stringify(result.data.token))
    }
    console.log(userFields)
    return (
        <div className="App">
            <h4>Register</h4>
            <Form >
              <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>First Name: </Form.Label>
                                    <Form.Control type="text" name="firstName" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{handleForm(e, 'firstName' )}} value={userFields.firstName}/>
                                </Col>
                                <Col>
                                    <Form.Label>Last Name: </Form.Label>
                                    <Form.Control type="text" name="lastName" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{handleForm(e, 'lastName' )}} value={userFields.lastName}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Email: </Form.Label>
                                    <Form.Control type="text" name="email" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{handleForm(e, 'email' )}} value={userFields.email}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Password </Form.Label>
                                    <Form.Control type="text" name="password1" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{handleForm(e, 'password1' )}} value={userFields.password1}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Repeat Password </Form.Label>
                                    <Form.Control type="text" name="password2" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{handleForm(e, 'password2' )}} value={userFields.password2}/>
                                </Col>
                            </Row>
                           
                              <Button style={{margin:"1em"}} onClick={saveUser} size="lg">Register</Button>
              

                              <GoogleLogin 
                              clientId="446627249737-sj7pmkvsibbf16vkhrsaqqt3kmi42n7j.apps.googleusercontent.com"
                              buttonText="Google Login"
                              onSuccess={responseGoogle}
                              onFailure={responseGoogle}
                              cookiePolicy={'single_host_origin'}
                          />
                            
            </Form.Group>
            </Form>
          </div>
    )
}
export default Register