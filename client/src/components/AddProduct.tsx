import React, {useState} from 'react'
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import {ProductDocument} from '../../../src/models/Product'

type Fields = {
    name: string,
    price: number
}

function AddProduct() {
    const [fields, setFields] = useState<Fields>({
        name: "",
        price: 0
    })
const handleForm = async (e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    const newProduct = {
        "name": fields.name,
        "price": fields.price,
        "digital": false,
        "variant": [
            {
                "brand": "aaa",
                "size": "xxx",
                "color": "zzz"
            }
        ],
       
    }
    const result = await axios.post<ProductDocument>('http://localhost:5000/api/v1/products', newProduct)
    console.log("saved", result)
}
const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = {...fields}
    values.name = e.target.value
    setFields(values)
}
const updatePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = {...fields}
    values.price = Number(e.target.value)
    setFields(values)
}
    return (
        <div className="App">
            <Container className="Container">
                
                    <Form>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>Product Name: </Form.Label>
                                    <Form.Control type="text" onChange={updateName} value={fields.name}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Price: </Form.Label>
                                    <Form.Control type="text" onChange={updatePrice} value={fields.price} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Image: </Form.Label>
                                    <Form.Select />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Button onClick={handleForm} className="btn" variant="success" type="submit" >Save</Button>
                    </Form>
            
            </Container>
        </div>
    )
}

export default AddProduct
