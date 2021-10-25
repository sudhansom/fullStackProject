import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {ProductDocument} from '../../../src/models/Product'

import { Button, Card, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import image from '../images/abc.png'

function ShowProducts() {
    const [allDatas, setAllDatas] = useState<ProductDocument[]>([])
    const getAllUsers = async () => {
        const allUsers = await axios.get<any>(`http://localhost:5000/api/v1/products/`)
        console.log("All Users: ",typeof(allUsers))
        //localStorage.setItem('allUsers', JSON.stringify(allUsers.data))
        setAllDatas(allUsers.data)
        return allUsers.data
    }
    useEffect(()=>{
        getAllUsers()
    }, [])
    //const allData = JSON.parse(localStorage.getItem('allUsers') as string) as ProductDocument[]
    // console.log(allData)

    const addToCart = (e: React.MouseEvent<HTMLButtonElement>, abc: ProductDocument)=>{
        console.log("clicked one", abc)
    }
    return (
       
            <div className="wrap">
                { allDatas.map(item => {return (

                    <div className="card">
                    <a href="/details/"><img src={image} alt="Nature"   width="100%"/></a>
                    <div className="details">
                        <h3>{item.name}</h3>
                        <h5>{item.price} DKK</h5>
                        {/*<Button variant="primary" onClick={(e)=>{addToCart(e, item)}}>See More</Button>*/}
                        <a href="/details/" >See More</a>
                    </div>
                </div> 
                )})}
                   
            </div>
       
    )
}

export default ShowProducts
