import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ProductDocument } from '../../../src/models/Product'

import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap'
import image from '../images/abc.png'
import watch1 from '../images/watch1.png'
import watch2 from '../images/watch2.png'
import watch3 from '../images/watch3.png'
import axios from 'axios'


type Params = {
    productId: string
}

function DetailPage() {
    const [picture, setPicture] = useState(image)
    const [product, setProduct] = useState<ProductDocument | null>(null)
    const { productId } = useParams<Params>()
    const addToCart = (e: React.MouseEvent<HTMLButtonElement>)=>{
        console.log("clicked one", productId)
    }
    
    useEffect(()=>{
        axios.get<ProductDocument>(`http://localhost:5000/api/v1/products/${productId}`).then(response => setProduct(response.data))
    }, [])
    
    console.log(product)

    const changePicture = ()=> {
        console.log("clicked picture....")
        setPicture(watch1)
    }
           
    return (
        
            <div className="detail">
                <div className="side_details">
                    <div className="each_photo">
                        <img src={watch1} alt="Nature"   width="100%" onClick={changePicture}/>
                    </div>
                    <hr />
                    <div className="each_photo">
                        <a href="/"><img src={watch2} alt="Nature"   width="100%"/></a> 
                    </div>
                    <hr />
                    <div className="each_photo">
                        <a href="/"><img src={watch3} alt="Nature"   width="100%"/></a> 
                    </div>
                    <hr />
               
                </div>
                <div className="card_details" >
                    <a href="/"><img src={picture} alt="Nature"   width="100%"/></a>
                     <div>
                         <hr />
                         <hr />
                        
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
                    
            </div>
            {/* <div className="card_details">
                    <div>
                        <a href="/"><img src={image} alt="Nature"   width="20%"/></a>
                        <a href="/"><img src={image} alt="Nature"   width="20%"/></a>
                        <a href="/"><img src={image} alt="Nature"   width="20%"/></a>
                    </div>
                    
                   
                    <Button variant="primary" onClick={(e)=>{addToCart(e)}}>Add to Cart</Button>     
            </div> */}
        </div>
       
    )
}

export default DetailPage

