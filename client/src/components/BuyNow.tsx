import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Navbar from './Navbar'
import { AddressDocument } from '../../../src/models/Address'
import { OrderItemDocument} from '../../../src/models/OrderItem'
import {OrdersDocument} from '../../../src/models/Orders'
import {UserDocument} from '../../../src/models/Users'
import {Store} from '../redux/reducers/index'
import { stringify } from 'querystring'
type Fields = {
    [key: string]: string | number
}



function BuyNow() {
    const [addressRequired, setAddressRequired] = useState<boolean>(true)
    //const [address, setAddress] = useState<AddressDocument[]>([])
    const isLoggedIn = useSelector((state: Store)=>state.userReducer.isLoggedIn)
    const user = useSelector((state: Store)=>state.userReducer.user)
    const products = useSelector((state: Store)=>state.productReducer.product)
    if(!user.address.length){
        user.address = [{
            street: '',
            houseNo: 1,
            city: '',
            postalCode: 1,
            country: '',
        },]
    }
    const [fields, setFields] = useState<Fields>({
        street: 'aaa',
        houseNo: 1,
        postalCode: 1,
        city: 'aaa',
        country: 'aaa'
    })

    //const user = JSON.parse(localStorage.getItem("user") as string)??{"_id":"111"}
    const userId = user?user._id:"aaa"
    useEffect(()=>{
        const address = user.address??[]
        console.log('redux address:', address)
        if(address.length && address[0].street && address[0].city && address[0].houseNo && address[0].postalCode && address[0].country){
            setAddressRequired(false)
            console.log('not required address', address)
            //setAddress([address])
            }else{
                setAddressRequired(true)
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
    // put this in thunk... 
    const result = await axios.put<any>(`http://localhost:5000/api/v1/users/${userId}`, {"address":newAddress})
}
const finishOrdering = (e:React.MouseEvent<HTMLButtonElement> ) => {
    e.preventDefault()
    console.log('ordering done...', products)
    type OrderItem = {
        [key: string]: number
    }
    //const orderItem: OrderItem = {}

    type Order = {
        totalPrice: number,
        users: [string],
        orderItem: OrderItem
        totalQuantity: number
    }
    
    const myOrder: Order = {
        totalPrice: 0,
        users:['itsme'],
        orderItem: {},
        totalQuantity: 0,
    }
        const firstProduct = products[0]._id
        myOrder.orderItem[firstProduct] = 1
        myOrder.totalQuantity = 1
    let tempPrice = 0
    for (let i=1; i<products.length; i++){
        console.log('inside product: ', products[i]._id)
        const allKeys = Object.keys(myOrder.orderItem)
        if(allKeys.includes(products[i]._id)){
            myOrder.orderItem[products[i]._id] += 1
        }else{
            myOrder.orderItem[products[i]._id] = 1
        }

        
        tempPrice += 1
        myOrder.totalPrice += products[i].price
        myOrder.totalQuantity += 1
    }
    console.log('or1:~', myOrder)
}

const updateFields = (e: React.ChangeEvent<HTMLInputElement>, val: string) => {
    const values = {...fields}
     // doing just opposite 
        values[val] = e.target.value
    setFields(values)
  }
const changeAddress = () => {
    setAddressRequired(true)
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
                        <div className="address">
                            <h3>Your Address </h3>
                            <hr />
                            <p>Street:      { user.address[0].street}</p>
                            <hr />
                            <p>House No:    { user.address[0].houseNo}</p>
                            <hr />
                            <p>City:        { user.address[0].city}</p>
                            <hr />
                            <p>Postal code: { user.address[0].postalCode}</p>
                            <hr />
                            <p>Country:     { user.address[0].country}</p>
                        </div>
                        <div className="address">
                            <Button onClick={changeAddress} variant="success" style={{width:"100%"}}>Edit</Button>
                        </div>
                    </div>
                    
            
                
                    <Form  style={{backgroundColor:"lightblue"}}>
                       <div className="address">
                            <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>Card Number: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'street' )}} value={`${fields.street}`}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>cvc: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'houseNumber' )}} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Name of the woner: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'postalCode' )}} />
                                </Col>
                            </Row>
                           
                            <Row>
                                <Col>
                                    <Form.Label>Country: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'country' )}} />
                                </Col>
                            </Row>
                            
                        </Form.Group>
                       </div>
                        <div className="address">
                            <Button onClick={finishOrdering} className="btn" variant="success" type="submit"  style={{width:"100%"}} disabled={addressRequired}>Buy</Button>
                        </div>
                    </Form>
                
                </div>
        </div>
    )
}

export default BuyNow
