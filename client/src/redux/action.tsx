import React from 'react'
import axios from 'axios'
import { Store } from '../redux/reducers/index'
import { useSelector, useDispatch } from 'react-redux'

import { ProductDocument } from '../../../src/models/Product'
import { UserDocument } from '../../../src/models/Users'

//import {VariantDocument} from '../../../src/models/Variant'

type Fields = {
  [key: string]: string
}

export const getProduct = (productId: string, variants: Fields) => {
  console.log('inside thunk...')
  return async (dispatch: any, getState: any) => {
    try {
      //eslint-disable-next-line
      let productList = localStorage.getItem('product')
        ? JSON.parse(localStorage.getItem('product') as string)
        : []
      const product = await axios.get<any>(
        `http://localhost:5000/api/v1/products/${productId}`
      )
      console.log('product: ', product.data)
      product.data.variant = [variants]

      localStorage.setItem(
        'product',
        JSON.stringify([...productList, product.data])
      )
      dispatch(successProduct([...productList, product.data]))
    } catch (err) {
      dispatch(onErrorProduct(err))
    }
  }
}

export const successProduct = (product: ProductDocument[]) => {
  return {
    type: 'PRODUCT_SUCCESS',
    payload: product,
  }
}

export const getUser = (url: string, fields: Fields) => {
  return async (dispatch: any, getState: any) => {
    try {
      const user = await axios.post<any>(url, fields)
      localStorage.setItem('token', JSON.stringify(user.data.token))
      localStorage.setItem('user', JSON.stringify(user.data.userData))
      localStorage.setItem('isLoggedIn', JSON.stringify(true))
      dispatch(successUser(user.data.userData))
    } catch (err) {
      dispatch(onErrorUser(err))
    }
  }
}
export const successUser = (user: UserDocument) => {
  return {
    type: 'USER_SUCCESS',
    payload: user,
  }
}

export const onErrorUser = (err: any) => {
  return {
    type: 'ON_ERROR_USER',
    payload: err,
  }
}

export const onErrorProduct = (err: any) => {
  return {
    type: 'ON_ERROR_PRODUCT',
    payload: err,
  }
}

export const getOrder = (order: any) => {
  // let orderList = localStorage.getItem('order')?(JSON.parse(localStorage.getItem('order') as string)):[]
  // orderList = [...orderList, order]
  localStorage.setItem('order', JSON.stringify(order))

  return {
    type: 'SAVE_ORDER',
    payload: order,
  }
}

export const getOneProduct = (productId: string) => {
  return async (dispatch: any, getState: any) => {
    console.log('in action:', productId)
    try {
      const url = `http://localhost:5000/api/v1/products/${productId}`
      const result = await axios.get(url)
      const oneProduct = result.data as ProductDocument
      localStorage.setItem('oneProduct', JSON.stringify(oneProduct))
      dispatch(successOneProduct(oneProduct))
    } catch (err) {
      dispatch(failureOneProduct(err))
    }
  }
}
export const successOneProduct = (oneProduct: ProductDocument) => {
  return {
    type: 'SUCCESS_ONE_PRODUCT',
    payload: oneProduct,
  }
}
export const failureOneProduct = (err: any) => {
  return {
    type: 'FAILURE_ONE_PRODUCT',
    payload: err,
  }
}

export const saveOrderToDataBase = (order: any) => {
  return async (dispatch: any, getState: any) => {
    try {
      const userId = getState().userReducer.user._id
      //order.users.push(userId)
      const url = `http://localhost:5000/api/v1/users/${userId}`
      const result = await axios.get<any>(url)
      console.log('User is after: ---', result.data)

      order.users = []
      order.completed = true
      order.users.push(userId)
      console.log('Order saved', order)
      const createdOrder = await axios.post<any>(
        `http://localhost:5000/api/v1/orders`,
        order
      )
      console.log('created Order', createdOrder.data._id)
      const updatedUser = await axios.put(url, {
        order: [createdOrder.data._id],
      })
      console.log('updatedUser:---', updatedUser)
      if (updatedUser) {
        localStorage.removeItem('product')
      }
      dispatch(onErrorSavingToDataBase('err'))
    } catch (err) {
      dispatch(onErrorSavingToDataBase(err))
    }
  }
}

export const onErrorSavingToDataBase = (err: any) => {
  return {
    type: 'ON_ERROR_PRODUCT',
    payload: err,
  }
}

export const logOutUser = () => {
  return {
    type: 'LOGOUT_USER',
  }
}

type GenericAction<T> = {
  type: T
}
type GenericActionWithPayload<T, K> = {
  type: T
  payload: K
}

type LogOutUser = GenericAction<'LOGOUT_USER'>
type OnErrorSavingToDataBase = GenericActionWithPayload<'ON_ERROR_PRODUCT', any>
type SuccessOneProduct = GenericActionWithPayload<
  'SUCCESS_ONE_PRODUCT',
  ProductDocument
>
type FailureOneProduct = GenericActionWithPayload<'FAILURE_ONE_PRODUCT', any>
type GetOrder = GenericActionWithPayload<'SAVE_ORDER', any>
type OnErrorProduct = GenericActionWithPayload<'ON_ERROR_PRODUCT', any>
type OnErrorUser = GenericActionWithPayload<'ON_ERROR_USER', any>
type SuccessProduct = GenericActionWithPayload<'PRODUCT_SUCCESS', any>
type SuccessUser = GenericActionWithPayload<'USER_SUCCESS', UserDocument>

export type AllActions =
  | SuccessUser
  | LogOutUser
  | OnErrorSavingToDataBase
  | SuccessOneProduct
  | FailureOneProduct
  | GetOrder
  | OnErrorProduct
  | OnErrorUser
  | SuccessProduct
