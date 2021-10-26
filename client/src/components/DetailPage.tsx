import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ProductDocument } from '../../../src/models/Product'

import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap'
import image from '../images/abc.png'
import axios from 'axios'


type Params = {
    productId: string
}

function DetailPage() {
    const [product, setProduct] = useState<ProductDocument | null>(null)
    const { productId } = useParams<Params>()
    const addToCart = (e: React.MouseEvent<HTMLButtonElement>)=>{
        console.log("clicked one", productId)
    }
    
    useEffect(()=>{
        axios.get<ProductDocument>(`http://localhost:5000/api/v1/products/${productId}`).then(response => setProduct(response.data))
    }, [])
    
    console.log(product)
           
    return (
        
            <div>
            <div className="card_details">
                    <a href="/"><img src={image} alt="Nature"   width="100%"/></a>
                    
            </div>
            <div className="card_details">
                    <div>
                        <a href="/"><img src={image} alt="Nature"   width="20%"/></a>
                        <a href="/"><img src={image} alt="Nature"   width="20%"/></a>
                        <a href="/"><img src={image} alt="Nature"   width="20%"/></a>
                    </div>
                    
                    <div>
                        <h3>Select your match: </h3>
                        <Form>
                            <Form.Group>
                                <Row>
                                    <Col>
                                    <h5>Company</h5>
                                        <select id="brand" className="variant" >
                                            <option value="ios">ios</option>
                                            <option value="mk" >mk</option>
                                            <option value="android">android</option>
                                        </select>
                                    </Col>
                                    <Col>
                                    <h5>Color</h5>
                                        <select id="color" className="variant" >
                                            <option value="red">red</option>
                                            <option value="blue" >blue</option>
                                            <option value="green">green</option>
                                        </select>
                                    </Col>
                                    <Col>
                                        <h5>Size</h5>
                                        <select id="size" className="variant" >
                                            <option value="small">small</option>
                                            <option value="medium" >medium</option>
                                            <option value="large">large</option>
                                        </select>
                                    </Col>
                                </Row>
                            </Form.Group>
                        
                        </Form> 
                    </div>
                    <Button variant="primary" onClick={(e)=>{addToCart(e)}}>Add to Cart</Button>     
            </div>
        </div>
       
    )
}

export default DetailPage

