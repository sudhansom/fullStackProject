import React, {useState} from 'react'
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import {ProductDocument} from '../../../src/models/Product'
//import {VariantDocument} from '../../../src/models/Variant'
type Fields = {
    name: string,
    price: number
}
type VariantDocument =  {
  brand: string
  size: string
  color: string
}
function AddProduct() {
    const [fields, setFields] = useState<Fields>({
        name: "",
        price: 0
    })
    const [variant, setVariant] = useState<VariantDocument>({
        brand: "ios",
        size: "red",
        color: "small"
    })
const handleForm = async (e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    const newProduct = {
        "name": fields.name,
        "price": fields.price,
        "digital": false,
        "variant": [
            {
                "brand": variant.brand,
                "size": variant.size,
                "color": variant.color
            }
        ],
       
    }
    const result = await axios.post<ProductDocument>('http://localhost:5000/api/v1/products', newProduct)
    console.log("saved", result)
    setFields({
        name: "",
        price: 0
    })
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
const [selectedFile, setSelectedFile] = useState('')
const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    
     console.log(e.target.files)
  
    //setSelectedFile(e.target.files)
}
//eslint-disable-next-line
const selectSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values: VariantDocument = {...variant}
    values.size = e.target.value
    setVariant(values)
}
const selectBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values: VariantDocument = {...variant}
    values.brand = e.target.value
    setVariant(values)
}
const selectColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values: VariantDocument = {...variant}
    values.color = e.target.value
    setVariant(values)
}
    return (
        <div className="App">
            <h4>Add product:</h4>
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
                                    <Form.Control type="text" onChange={uploadImage} placeholder="copy image url" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Category: </Form.Label>
                                    <Form.Control type="text" onChange={uploadImage} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Quantiy: </Form.Label>
                                    <Form.Control type="text" onChange={uploadImage} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <select id="brand" className="variant" onChange={selectBrand}>
                                        <option value="ios">ios</option>
                                        <option value="mk" >mk</option>
                                        <option value="android">android</option>
                                    </select>
                                </Col>
                                <Col>
                                    <select id="color" className="variant" onChange={selectColor}>
                                        <option value="red">red</option>
                                        <option value="blue" >blue</option>
                                        <option value="green">green</option>
                                    </select>
                                </Col>
                                 <Col>
                                    <select id="size" className="variant" onChange={selectSize}>
                                        <option value="small">small</option>
                                        <option value="medium" >medium</option>
                                        <option value="large">large</option>
                                    </select>
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
