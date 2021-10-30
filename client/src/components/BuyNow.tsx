import React, {useState} from 'react'
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Navbar from './Navbar'
type Fields = {
    [key: string]: string | number
}



function BuyNow() {
    const [fields, setFields] = useState<Fields>({
        street: '',
        houseNo: 0,
        postalCode: 0,
        city: '',
        country: ''
    })
    const user = JSON.parse(localStorage.getItem("user") as string)
    const userId = user._id
const handleForm = async (e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    const newAddress = {
        "street": fields.street,
        "houseNo": Number(fields.houseNo),
        "postalCode": fields.postalCode,
        "city": fields.city,
        "country": fields.country,
    }
    console.log("i am here")
    const result = await axios.put<any>(`http://localhost:5000/api/v1/users/${userId}`, {"address":newAddress})
}

const updateFields = (e: React.ChangeEvent<HTMLInputElement>, val: string) => {
    const values = {...fields}
     // doing just opposite 
        values[val] = e.target.value
       
    
    setFields(values)
  }
    return (
        <div className="homePage">
           <Navbar />
           <div className="paymentPage">
              <Form>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>Street: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'street' )}} value={`${fields.street}`}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>House no: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'houseNumber' )}} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Postal Code: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'postalCode' )}} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>City: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'city' )}} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Country: </Form.Label>
                                    <Form.Control type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateFields(e, 'country' )}} />
                                </Col>
                            </Row>
                            
                        </Form.Group>
                        <Button onClick={handleForm} className="btn" variant="success" type="submit" >Save</Button>
                    </Form>
            
           </div>
        </div>
    )
}

export default BuyNow
