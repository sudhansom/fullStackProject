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
    
    localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('product',product)
    localStorage.setItem('isLoggedIn',JSON.stringify(isLoggedIn))


    return storeFactory
})


export default storeFactory