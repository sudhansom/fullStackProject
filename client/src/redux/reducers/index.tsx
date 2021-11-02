import userReducer from "./userReducer";
import productReducer from "./productReducer";
import {combineReducers} from "redux";
import { DefaultUserState } from "./userReducer";
import { DefaultProductState } from "./productReducer";
import {UserDocument} from '../../../../src/models/Users'
import {ProductDocument} from '../../../../src/models/Product'
import {OrdersDocument} from '../../../../src/models/Orders'


const allReducres = combineReducers({
    userReducer,
    productReducer
})

export type Store = ReturnType<typeof allReducres>

type PreloadedState = {
    userReducer: DefaultUserState,
    productReducer: DefaultProductState
}

export const preloadedState: PreloadedState = {
    userReducer:{
        user:localStorage.getItem('user')?(JSON.parse(localStorage.getItem('user') as string)) as UserDocument | null:null,
        err: '',
        isLoggedIn: localStorage.getItem('isLoggedIn')?(JSON.parse(localStorage.getItem('isLoggedIn') as string)) as boolean:false,
    },
    productReducer: {
        product:localStorage.getItem('product')?(JSON.parse(localStorage.getItem('product') as string)) as ProductDocument[]:[],
        order:localStorage.getItem('product')?(JSON.parse(localStorage.getItem('order') as string)) as OrdersDocument[]:[],
        err: '',
        oneProduct:localStorage.getItem('oneProduct')?(JSON.parse(localStorage.getItem('oneProduct') as string)) as ProductDocument | null:null,
    }
}

export default allReducres