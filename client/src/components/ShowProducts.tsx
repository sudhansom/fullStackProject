import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { ProductDocument } from '../../../src/models/Product'

//import { Button, Card, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

//import image from '../images/abc.png'

function ShowProducts() {
  const [allDatas, setAllDatas] = useState<ProductDocument[]>([])
  console.log('baseUrl:', process.env.REACT_APP_BACKEND_URL)
  const getAllProduct = async () => {
    const allProducts = await axios.get<any>(`/products/`)
    console.log('All Users: ', typeof allProducts)
    //localStorage.setItem('allUsers', JSON.stringify(allUsers.data))
    setAllDatas(allProducts.data)
    return allProducts.data
  }
  useEffect(() => {
    getAllProduct()
  }, [])
  //const allData = JSON.parse(localStorage.getItem('allUsers') as string) as ProductDocument[]
  // console.log(allData)

  // const addToCart = (
  //   e: React.MouseEvent<HTMLButtonElement>,
  //   abc: ProductDocument
  // ) => {
  //   console.log('clicked one', abc)
  // }
  return (
    <div className="wrap">
      {allDatas.map((item, index) => {
        return (
          // just to check github
          <div className="card" key={index}>
            <p>something comming</p>
            <a href={`/details/${item._id}`}>
              <img
                src={item.images[0]}
                alt="Nature"
                width="100%"
                height="170px"
              />
            </a>
            <div className="details">
              <h3>{item.name}</h3>
              <h5>{item.price} DKK</h5>
              {/*<Button variant="primary" onClick={(e)=>{addToCart(e, item)}}>See More</Button>*/}
              <Link to={`/details/${item.id}`} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ShowProducts
