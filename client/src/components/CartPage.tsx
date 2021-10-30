import React, {useState} from 'react'
import Navbar from './Navbar'
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {ProductDocument} from '../../../src/models/Product'

function CartPage() {
    const [total, setTotal] = useState<Number>(0)
    const cart: ProductDocument[] = JSON.parse(localStorage.getItem('product') as string)
    let tempCart: string[] = []
    cart.forEach((current, indx, arr) =>{
        if(tempCart.includes(current._id)){
            console.log('it contains', current.name)
        }
        else{
            tempCart.push(current._id)
        }
        
    })
    console.log('final Cart:', tempCart)
    return (
        <div className="homePage">
            <Navbar />
            <Card className="cartContainer">
                <Row>
                    <Col><Button variant="info" style={{width:"100%"}}>Back</Button></Col>
                </Row>

                <Row className="heading">
                    <Col>Item</Col> <Col>Name</Col><Col>Quantity</Col><Col>Total</Col><Col>Remove</Col>
                </Row>
                {cart.map(elem=>{
                    return (
                    <Row>
                        <hr/>
                        <Col><img src={elem.images[0]} height="60px" width="100px"></img></Col> 
                        <Col>{elem.name}</Col>
                        <Col>{elem.quantity}</Col>
                        <Col>{elem.price}</Col>
                        <Col>X</Col>
                        
                    </Row>
                    
                    
                )})}
                <hr/>
                <Row className="heading">
                    <Col>Total quantity: {"quantity"}</Col> <Col>Total price: {total}</Col>
                </Row>
                
                <Row className="heading">
                    <Col><Button variant="success" style={{width:"100%"}}>Checkout</Button></Col>
                </Row>
            </Card>
        </div>
    )
}

export default CartPage
