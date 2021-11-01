import React, {useState} from 'react'
import Navbar from './Navbar'
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {ProductDocument} from '../../../src/models/Product'
import { VariantDocument } from '../../../src/models/Variant'
import {useSelector} from 'react-redux'
import {Store} from '../redux/reducers/index'

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
    const products = useSelector((state: Store)=>state.productReducer.product)
    
    const finishOrdering = () => {
    console.log('ordering done...', products)
    type Variant = {
        [key: string]: any
    }
    type Item = {
        name: string,
        images: string[],
        variant: Variant,
        quantity: number,
    }
    type OrderItem = {
        [key: string]: Item
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
        myOrder.orderItem[firstProduct] = {
            name : products[0].name,
            images : products[0].images,
            variant: products[0].variant,
            quantity: 1
        }
        myOrder.totalQuantity = 1
    let tempPrice = 0
    for (let i=1; i<products.length; i++){
        console.log('inside product: ', products[i]._id)
        const allKeys = Object.keys(myOrder.orderItem)
        if(allKeys.includes(products[i]._id) ){ //&& myOrder.orderItem[products[i]._id].variant[0]['brand']===products[i].variant[0]['brand'] && myOrder.orderItem[products[i]._id].variant[0]['size']===products[i].variant[0]['size'] && myOrder.orderItem[products[i]._id].variant[0]['color']===products[i].variant[0]['color'] ){

            myOrder.orderItem[products[i]._id].quantity += 1
        }else{
           
            myOrder.orderItem[products[i]._id] = {
            name : products[i].name,
            images : products[i].images,
            variant: products[i].variant,
            quantity: 1
        }
         //console.log('1---',myOrder.orderItem[products[i]._id].variant, '2---', products[i].variant)
        }

        
        tempPrice += 1
        myOrder.totalPrice += products[i].price
        myOrder.totalQuantity += 1
    }
    console.log('or1:~', myOrder)
    return myOrder
}
const myOrder = finishOrdering()

const allProducts = Object.keys(myOrder.orderItem)
console.log(allProducts)
for (let x of allProducts){
    console.log('myOrder', myOrder.orderItem[x])
}

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
                {cart && cart.map(elem=>{
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
                    <Col>Total quantity: {cart && cart.length}</Col> <Col>Total price: 444</Col>
                </Row>
                
                <Row className="heading">
                    <Col><Button variant="success" style={{width:"100%"}} onClick={redirectPage}>Checkout</Button></Col>
                </Row>
            </Card>
        </div>
    )
}

export default CartPage
