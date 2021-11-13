import React, {useState} from 'react'
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
// import {ProductDocument} from '../../../src/models/Product'
// import { validateLocaleAndSetLanguage } from 'typescript'
//import {VariantDocument} from '../../../src/models/Variant'
type Fields = {
    [key: string]: string | string[] | boolean | number | VariantDocument[]
}
type VariantDocument =  {
  [key: string]: string
}
function AddProduct() {
    const [image, setImage] = useState('')
    const [fields, setFields] = useState<Fields>({
        name: '',
        images:[],
        price: 0,
        digital: false,
        variant: [],
        quantity: 1,
        category: ''
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
        "images": fields.images,
        "price": Number(fields.price),
        "digital": fields.digital,
        "category": fields.category,
        "quantity": Number(fields.quantity),
        "variant": [
            {
                "brand": variant.brand,
                "size": variant.size,
                "color": variant.color
            }
        ],
       
    }
    const result = await axios.post<any>('http://localhost:5000/api/v1/products', newProduct)
}
const updateFields = (e: React.ChangeEvent<HTMLInputElement>, val: string) => {
    const values = {...fields}
    if(val.localeCompare("images")){ // doing just opposite 
        values[val] = e.target.value
        console.log(val)
    }else{
        const a = values.images as string [] 
        setImage(e.target.value)
        if(e.target.value){
            a.push(e.target.value)
            values.images = a
        }
        console.log('it is image field: ', values.images)
    }
    setFields(values)
  }
const updateImage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setImage('')
}

//eslint-disable-next-line
const updateVariants = (e: React.ChangeEvent<HTMLSelectElement>, val: string) => {
    const values = {...variant}
    values[val] = e.target.value
    setVariant(values)
  }
  console.log("images--",fields)

    return (
        <div className="App">
            <h4>Add product:</h4>
            <Container className="Container">
                
                    <Form>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>Product Name: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'name' )}} value={`${fields.name}`}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Price: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'price' )}} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Image: </Form.Label><button onClick={updateImage}>+</button>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'images' )}} value={`${image}`}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Category: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'category' )}} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Quantiy: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'quantity' )}} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <select id="brand" className="variant" onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>{updateVariants(e, 'brand' )}} value={variant.brand}>
                                        <option value="ios">ios</option>
                                        <option value="mk" >mk</option>
                                        <option value="android">android</option>
                                    </select>
                                </Col>
                                <Col>
                                    <select id="color" className="variant" onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>{updateVariants(e, 'color' )}} value={variant.color}>
                                        <option value="red">red</option>
                                        <option value="blue" >blue</option>
                                        <option value="green">green</option>
                                    </select>
                                </Col>
                                 <Col>
                                    <select id="size" className="variant" onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>{updateVariants(e, 'size' )}} value={variant.size}>
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
