import React from 'react'
import axios from 'axios'

import {ProductDocument} from '../../../src/models/Product'

type Fields = {
  [key: string]: string
}



export const getProduct =  (productId: string) => {
    console.log('inside thunk...')
   return async (dispatch: any, getState: any) => {
        try{
            const product = await axios.get<any>(`http://localhost:5000/api/v1/products/${productId}`)
            localStorage.setItem('product', JSON.stringify(product.data))
            dispatch(successProduct(product.data))
        }catch(err){
            dispatch(onError(err))
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
            dispatch(onError(err))
        }
    }
}
export const successUser = (product: ProductDocument) => {
    return {
        type: "USER_SUCCESS",
        payload: product,
    }
}


export const onError = (err: any) => {
    return {
        type: "ON_ERROR",
        payload: err,
    }
}