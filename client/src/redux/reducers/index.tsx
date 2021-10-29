import userReducer from "./userReducer";
import productReducer from "./productReducer";
import {combineReducers} from "redux"

const allReducres = combineReducers({
    userReducer,
    productReducer
})

export default allReducres