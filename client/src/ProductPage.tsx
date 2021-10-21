import React, {useEffect} from 'react'
import axios from 'axios'
import {ProductDocument} from '../../src/models/Product'

import { Button, Card, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import image from './abc.png'

function ProductPage() {
    const getAllUsers = async () => {
        const allUsers = await axios.get(`http://localhost:5000/api/v1/products/`)
        localStorage.setItem('allUsers', JSON.stringify(allUsers.data))
        return allUsers.data
    }
    getAllUsers()
    const allData = JSON.parse(localStorage.getItem('allUsers') as string) as ProductDocument[]
    console.log(allData)
    return (
        <div className="App">
            <Container className="Container">
            { allData.map(abc => {return <Card className="Cards">
                <Card.Img src={image}>

                </Card.Img>
                <Card.Body>
                    <Card.Title>
                        {abc.name}
                    </Card.Title>
                    <Card.Text>
                            {abc.price}
                    </Card.Text>
                </Card.Body>
                <Button variant="primary" >add to cart</Button>
            </Card>}) }
            </Container>
        </div>
    )
}

export default ProductPage
