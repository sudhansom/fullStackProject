import React, {useState} from 'react'
import Navbar from './Navbar'
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {ProductDocument} from '../../../src/models/Product'
import { VariantDocument } from '../../../src/models/Variant'
import {useSelector, useDispatch} from 'react-redux'
import {Store} from '../redux/reducers/index'
import {getOrder} from '../redux/action'

type Fields = {
    [key: string]:string
}
const redirectPage = ()=>{
    //eslint-disable-next-line
    location.href='/buyNow'
}

function CartPage() {
    const dispatch = useDispatch()
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
        price: number,
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
        totalPrice: products[0].price,
        users:['itsme'],
        orderItem: {},
        totalQuantity: 1,
    }
        const firstProduct = products[0]._id
        myOrder.orderItem[firstProduct] = {
            name : products[0].name,
            price: products[0].price,
            images : products[0].images,
            variant: products[0].variant,
            quantity: 1
        }
        myOrder.totalQuantity = 1
    let tempPrice = 0
    for (let i=1; i<products.length; i++){
        console.log('inside product: ', products[i]._id)
        const allKeys = Object.keys(myOrder.orderItem)
        let a = true
        while(a){
            if(allKeys.includes(products[i]._id) ){ 
                if (myOrder.orderItem[products[i]._id].variant[0]['brand']===products[i].variant[0]['brand'] && myOrder.orderItem[products[i]._id].variant[0]['size']===products[i].variant[0]['size'] && myOrder.orderItem[products[i]._id].variant[0]['color']===products[i].variant[0]['color'] ){
                myOrder.orderItem[products[i]._id].quantity += 1
                a = false
                }else{
                    products[i]._id = products[i]._id + 'a'
                }
                
            }else{
            
                myOrder.orderItem[products[i]._id] = {
                name : products[i].name,
                images : products[i].images,
                price : products[i].price,
                variant: products[i].variant,
                quantity: 1
            }
            a = false
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
dispatch(getOrder(myOrder))

const allProducts = Object.keys(myOrder.orderItem)
console.log(allProducts)

console.log('images',myOrder.orderItem[allProducts[0]].variant[0], myOrder.totalPrice)

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
                {allProducts && allProducts.map(elem=>{
                    return (
                    <Row>
                        <hr/>
                        <Col><img src={myOrder.orderItem[elem].images[0]} height="60px" width="100px"></img></Col> 
                        <Col>{myOrder.orderItem[elem].name}</Col>
                        <Col>{myOrder.orderItem[elem].quantity}</Col>
                        <Col>{(myOrder.orderItem[elem].price)*(myOrder.orderItem[elem].quantity)}</Col>
                        <Col>{myOrder.orderItem[elem].variant[0]['brand']}/{myOrder.orderItem[elem].variant[0]['size']}/{myOrder.orderItem[elem].variant[0]['color']}</Col>
                        {/* (el: Variant => {return (<div><span>{el['brand']}</span> / <span>{el['color']}</span> / <span>{el['size']}</span></div>)})}</Col> */}
                        <Col>X</Col>
                        
                    </Row>
                    
                    
                )})}
                <hr/>
                <Row className="heading">
                    <Col>Total quantity: {myOrder.totalQuantity}</Col> <Col>Total price: {myOrder.totalPrice}</Col>
                </Row>
                
                <Row className="heading">
                    <Col><Button variant="success" style={{width:"100%"}} onClick={redirectPage}>Checkout</Button></Col>
                </Row>
            </Card>
        </div>
    )
}

export default CartPage
