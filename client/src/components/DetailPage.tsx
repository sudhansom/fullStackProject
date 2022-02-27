import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap'
import image from '../images/abc.png'
import axios from 'axios'

import { getProduct, getOneProduct } from '../redux/action'
import { ProductDocument } from '../../../src/models/Product'
import { Store } from '../redux/reducers'

type Params = {
  productId: string
}
type VariantDocument = {
  [key: string]: string
}

function DetailPage() {
  const dispatch = useDispatch()
  const [picture, setPicture] = useState(image)
  const [product, setProduct] = useState<ProductDocument | null>(null)
  const { productId } = useParams<Params>()
  console.log('productId:', productId)
  const oneProduct = useSelector(
    (state: Store) => state.productReducer.oneProduct
  )

  useEffect(() => {
    console.log('inside useEffect...')
    dispatch(getOneProduct(productId))
  }, [productId])

  console.log('oneProduct....', oneProduct)
  const [variant, setVariant] = useState<VariantDocument>({
    brand: 'ios',
    size: 'red',
    color: 'small',
  })

  console.log(product)

  const changePicture = () => {
    console.log('clicked picture....')
    // setPicture(watch1)
  }
  const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    //eslint-disable-next-line
    location.href = '/products'
  }

  const addToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('clicked one')
    dispatch(getProduct(productId, variant))
    alert('product added to the cart')
  }
  const updateVariants = (
    e: React.ChangeEvent<HTMLSelectElement>,
    val: string
  ) => {
    const values = { ...variant }
    values[val] = e.target.value
    setVariant(values)
  }

  // for (let i=0; i<oneProduct.images.length; i++){
  //     let itemName = 'name' + i.toString()
  //     itemName = oneProduct.images[i]
  // }

  return (
    <div className="detail">
      <div className="side_details">
        <div className="each_photo">
          <img
            src={oneProduct.images[0]}
            alt="Nature"
            width="100%"
            onClick={changePicture}
          />
        </div>
        <hr />
        {/* <div className="each_photo">
          <a href="#">
            <img src={oneProduct.images[0]} alt="Nature" width="100%" />
          </a>
        </div> */}
        <hr />
        <div className="each_photo">
          <a href="#">
            <img src={oneProduct.images[0]} alt="Nature" width="100%" />
          </a>
        </div>
        <hr />
      </div>
      <div className="card_details">
        <a href="#">
          <img src={oneProduct.images[0]} alt="Nature" width="100%" />
        </a>
        <div>
          <hr />

          <Form>
            <Form.Group>
              <Row>
                <Col>
                  <h5>Company</h5>
                  <select
                    id="brand"
                    className="variant"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      updateVariants(e, 'brand')
                    }}
                    value={variant.brand}
                  >
                    <option value="ios">ios</option>
                    <option value="mk">mk</option>
                    <option value="android">android</option>
                  </select>
                </Col>
                <Col>
                  <h5>Color</h5>
                  <select
                    id="color"
                    className="variant"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      updateVariants(e, 'color')
                    }}
                    value={variant.color}
                  >
                    <option value="red">red</option>
                    <option value="blue">blue</option>
                    <option value="green">green</option>
                  </select>
                </Col>
                <Col>
                  <h5>Size</h5>
                  <select
                    id="size"
                    className="variant"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      updateVariants(e, 'size')
                    }}
                    value={variant.size}
                  >
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                  </select>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </div>
        <Button
          variant="primary"
          onClick={goBack}
          style={{ marginRight: '2em' }}
        >
          &larr; Back
        </Button>
        <Button variant="primary" onClick={addToCart}>
          Add to Cart
        </Button>
      </div>
      <div className="card_detail">
        <div>
          <h3 style={{ marginLeft: '5em' }}>Detail of the item</h3>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi illo
            mollitia quam expedita sunt fuga dolorem consectetur quae nulla
            dolores. Doloribus, iure. Culpa cum repellendus accusantium
            molestias rem, veniam ex!
          </p>
        </div>
      </div>
    </div>
  )
}

export default DetailPage
