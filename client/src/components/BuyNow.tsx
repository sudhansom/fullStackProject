import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Navbar from './Navbar'
import { AddressDocument } from '../../../src/models/Address'
import {Store} from '../redux/reducers/index'
type Fields = {
    [key: string]: string | number
}



function BuyNow() {
    const [addressRequired, setAddressRequired] = useState<boolean>(true)
    const [address, setAddress] = useState<AddressDocument[]>([])
    const address1 = useSelector((state: Store)=>state.userReducer.user.address)
    const [fields, setFields] = useState<Fields>({
        street: 'aaa',
        houseNo: 1,
        postalCode: 1,
        city: 'aaa',
        country: 'aaa'
    })

    const user = JSON.parse(localStorage.getItem("user") as string)??{"_id":"111"}
    const userId = user._id
    useEffect(()=>{
        const address = user.address??[]
        if(address.length && address[0].street && address[0].city && address[0].houseNo && address[0].postalCode && address[0].country){
            setAddressRequired(false)
            console.log('not required address', address)
            setAddress([address])
            }
    }, [])
    
        
const handleForm = async (e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    const newAddress = {
        "street": fields.street,
        "houseNo": Number(fields.houseNo),
        "postalCode": fields.postalCode,
        "city": fields.city,
        "country": fields.country,
    }
    console.log("i am here")
    const result = await axios.put<any>(`http://localhost:5000/api/v1/users/${userId}`, {"address":newAddress})
}

const updateFields = (e: React.ChangeEvent<HTMLInputElement>, val: string) => {
    const values = {...fields}
     // doing just opposite 
        values[val] = e.target.value
       
    
    setFields(values)
  }
    return (
        <div className="homePage">
           <Navbar />
           <div className="paymentPage">
              <Form style={{backgroundColor:"lightblue", display:addressRequired?'inline-block':'none'}}>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>Street: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'street' )}} value={`${fields.street}`}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>House no: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'houseNumber' )}} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Postal Code: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'postalCode' )}} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>City: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'city' )}} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Country: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'country' )}} />
                                </Col>
                            </Row>
                            
                        </Form.Group>
                        <Button onClick={handleForm} className="btn" variant="success" type="submit" style={{width:"100%"}} >Save</Button>
                    </Form>
                    <div style={{backgroundColor:"lightblue", display:addressRequired?'none':'inline-block'}}>
                        <h3>Your Address </h3>
                        <p>Street:      { address1[0].street}</p>
                        <p>House No:    { address1[0].houseNo}</p>
                        <p>City:        { address1[0].city}</p>
                        <p>Postal code: { address1[0].postalCode}</p>
                        <p>Country:     { address1[0].country}</p>
                    </div>
            
           
           <Form style={{backgroundColor:"lightblue"}}>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>Street: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'street' )}} value={`${fields.street}`}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>House no: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'houseNumber' )}} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Postal Code: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'postalCode' )}} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>City: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'city' )}} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Country: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'country' )}} />
                                </Col>
                            </Row>
                            
                        </Form.Group>
                        <Button onClick={handleForm} className="btn" variant="success" type="submit"  style={{width:"100%"}}>Save</Button>
                    </Form>
                </div>
        </div>
    )
}

export default BuyNow
