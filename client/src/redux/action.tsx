import React from 'react'
import axios from 'axios'

import {ProductDocument} from '../../../src/models/Product'





export const getProduct =  (productId: string) => {
    console.log('inside thunk...')
   return async (dispatch: any, getState: any) => {
        try{
            const product = await axios.get<any>(`http://localhost:5000/api/v1/products/${productId}`)
            dispatch(successProduct(product.data))
        }catch(err){
            dispatch(errorOnGettingProduct(err))
        }
   }
}

export const successProduct = (product: ProductDocument) => {
    return {
        type: "PRODUCT_SUCCESS",
        payload: product,
    }
}

export const errorOnGettingProduct = (err: any) => {
    return {
        type: "ON_ERROR",
        payload: err,
    }
}