import React from 'react'
import axios from 'axios'

import {ProductDocument} from '../../../src/models/Product'
//import {VariantDocument} from '../../../src/models/Variant'

type Fields = {
  [key: string]: string
}

export type VariantDocument = {
  brand: string
  size: string
  color: string
}

type OrderItem = {
    productId: string
    name: string
    image: string
    quantity: Number
    variant: VariantDocument
}
type Order = {
    userId: string
    totalPrice: number
    totalQuantity: number
    orderItem: [OrderItem]
}





export const getProduct =  (productId: string) => {
    console.log('inside thunk...')
   return async (dispatch: any, getState: any) => {
        try{
            //eslint-disable-next-line
            let productList = localStorage.getItem('product')?(JSON.parse(localStorage.getItem('product') as string)):[]
            const product = await axios.get<any>(`http://localhost:5000/api/v1/products/${productId}`)
            const item = product.data
            productList = [...productList, product.data]
            localStorage.setItem('product', JSON.stringify(productList))
            //eslint-disable-next-line
            const cart: Order = localStorage.getItem('cart')?(JSON.parse(localStorage.getItem('cart') as string)):(
                {
                userId:'me',
                totalPrice: 0,
                totalQuantity: 0,
                orderItem: [{
                    productId: item._id,
                    name:item.name,
                    image:item.images,
                    quantity: 0,
                    variant: {
                        brand: item.variant.brand,
                        size: item.variant.size,
                        color: item.variant.color
                    }
                }]
            }
            )
            
                let price = Number(cart.totalPrice)
                price = price + Number(item.price)
                cart.totalPrice = price
                let num = Number(cart.totalQuantity)
                num = num + 1;
                cart.totalQuantity = num;
                const foundItem = cart.orderItem.filter(elem => elem.productId === item.productId);
                if(foundItem){
                    console.log("already exists")
                }else{
                    let temp = 
                    {
                        productId: item._id,
                        name:item.name,
                        image:item.images,
                        quantity: 1,
                        variant:{
                            brand: item.variant.brand,
                            size: item.variant.size,
                            color: item.variant.color
                        },
                    }
                    cart.orderItem.push(temp)
                

            }
            localStorage.setItem('cart', JSON.stringify(cart))
            
            dispatch(successProduct(product.data))
        }catch(err){
            dispatch(onErrorProduct(err))
        }
   }
}

export const successProduct = (product: ProductDocument) => {
    return {
        type: "PRODUCT_SUCCESS",
        payload: product,
    }
}

export const getUser = (url: string, fields: Fields ) => {
    return async (dispatch: any, getState: any) => {
        try{
            const user = await axios.post<any>(url, fields)
            localStorage.setItem('token', JSON.stringify(user.data.token))
            dispatch(successUser(user.data.userData))
        }catch(err){
            dispatch(onErrorUser(err))
        }
    }
}
export const successUser = (product: ProductDocument) => {
    return {
        type: "USER_SUCCESS",
        payload: product,
    }
}


export const onErrorUser = (err: any) => {
    return {
        type: "ON_ERROR_PRODUCT",
        payload: err,
    }
}

export const onErrorProduct = (err: any) => {
    return {
        type: "ON_ERROR_PRODUCT",
        payload: err,
    }
}