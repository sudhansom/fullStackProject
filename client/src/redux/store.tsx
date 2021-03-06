import { createStore, applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import { preloadedState } from './reducers/index'

import allReducers from './reducers'
import thunk from 'redux-thunk'


const storeFactory = ()=>{
    const middleware = [thunk]
    const reduxStore = createStore(allReducers,preloadedState, composeWithDevTools(applyMiddleware(...middleware)))
    return reduxStore
}
storeFactory().subscribe(()=>{
    const currentState = storeFactory().getState()
    const user = currentState.userReducer.user
    const isLoggedIn = currentState.userReducer.isLoggedIn
    const product = currentState.productReducer.product
    const oneProduct = currentState.productReducer.oneProduct
    const order = currentState.productReducer.order
    
    localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('product',JSON.stringify(product))
    localStorage.setItem('oneProduct',JSON.stringify(oneProduct))
    localStorage.setItem('order',JSON.stringify(order))
    localStorage.setItem('isLoggedIn',JSON.stringify(isLoggedIn))


    return storeFactory
})


export default storeFactory