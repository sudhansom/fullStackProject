import React, {useState} from 'react'
import Navbar from './Navbar'
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {ProductDocument} from '../../../src/models/Product'
import { VariantDocument } from '../../../src/models/Variant'

type Fields = {
    [key: string]:string
}
const redirectPage = ()=>{
    //eslint-disable-next-line
    location.href='/buyNow'
}

function CartPage() {
    const [total, setTotal] = useState<Number>(0)
    const cart: ProductDocument[] = JSON.parse(localStorage.getItem('product') as string) 
    return (
        <div className="homePage">
            <Navbar />
            <Card className="cartContainer">
                <Row>
                    <Col><Button variant="info" style={{width:"100%"}}>Back</Button></Col>
                </Row>

                <Row className="heading">
                    <Col>Item</Col> <Col>Name</Col><Col>Quantity</Col><Col>Total</Col><Col>Variant</Col><Col>Remove</Col>
                </Row>
                {cart.map(elem=>{
                    return (
                    <Row>
                        <hr/>
                        <Col><img src={elem.images[0]} height="60px" width="100px"></img></Col> 
                        <Col>{elem.name}</Col>
                        <Col>{elem.quantity}</Col>
                        <Col>{elem.price}</Col>
                        <Col>{elem.variant.map(el => {return (<div><span>{el['brand']}</span> / <span>{el['color']}</span> / <span>{el['size']}</span></div>)})}</Col>
                        <Col>X</Col>
                        
                    </Row>
                    
                    
                )})}
                <hr/>
                <Row className="heading">
                    <Col>Total quantity: {cart.length}</Col> <Col>Total price: 444</Col>
                </Row>
                
                <Row className="heading">
                    <Col><Button variant="success" style={{width:"100%"}} onClick={redirectPage}>Checkout</Button></Col>
                </Row>
            </Card>
        </div>
    )
}

export default CartPage
