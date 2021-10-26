import React from 'react'

import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap'
import image from '../images/abc.png'

function DetailPage() {
    const addToCart = (e: React.MouseEvent<HTMLButtonElement>)=>{
        console.log("clicked one")
    }
    return (
        
        <div>
            <div className="card_details">
                    <a href="/details/"><img src={image} alt="Nature"   width="100%"/></a>
                    
            </div>
            <div className="card_details">
                    <div>
                        <a href="/details/"><img src={image} alt="Nature"   width="20%"/></a>
                        <a href="/details/"><img src={image} alt="Nature"   width="20%"/></a>
                        <a href="/details/"><img src={image} alt="Nature"   width="20%"/></a>
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

