import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
                    // just to check github
                    <div className="card">
                        <a href={`/details/${item._id}`}><img src={item.images[0]} alt="Nature"   width="100%" height="170px"/></a>
                        <div className="details">
                            <h3>{item.name}</h3>
                            <h5>{item.price} DKK</h5>
                            {/*<Button variant="primary" onClick={(e)=>{addToCart(e, item)}}>See More</Button>*/}
                            <Link to={`/details/${item.id}`}   />
                    </div>
                        
                        
                   
                </div> 
                )})}
                   
            </div>
       
    )
}

export default ShowProducts
