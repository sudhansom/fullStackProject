import React from 'react'
import axios from 'axios'

import {ProductDocument} from '../../../src/models/Product'
import {UserDocument} from '../../../src/models/Users'

//import {VariantDocument} from '../../../src/models/Variant'

type Fields = {
  [key: string]: string
}

export const getProduct =  (productId: string, variants: Fields) => {
    console.log('inside thunk...')
   return async (dispatch: any, getState: any) => {
        try{
            //eslint-disable-next-line
            let productList = localStorage.getItem('product')?(JSON.parse(localStorage.getItem('product') as string)):[]
            const product = await axios.get<any>(`http://localhost:5000/api/v1/products/${productId}`)
            product.data.variant = [variants]
            productList = [...productList, product.data]
            localStorage.setItem('product', JSON.stringify(productList))
            dispatch(successProduct(product.data))
            console.log('changed?',product.data)
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
            localStorage.setItem('user', JSON.stringify(user.data.userData))
            dispatch(successUser(user.data.userData))
        }catch(err){
            dispatch(onErrorUser(err))
        }
    }
}
export const successUser = (user: UserDocument) => {
    return {
        type: "USER_SUCCESS",
        payload: user,
    }
}


export const onErrorUser = (err: any) => {
    return {
        type: "ON_ERROR_USER",
        payload: err,
    }
}

export const onErrorProduct = (err: any) => {
    return {
        type: "ON_ERROR_PRODUCT",
        payload: err,
    }
}