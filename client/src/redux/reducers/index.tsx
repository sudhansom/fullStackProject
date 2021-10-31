import userReducer from "./userReducer";
import productReducer from "./productReducer";
import {combineReducers} from "redux"

const allReducres = combineReducers({
    userReducer,
    productReducer
})

export type Store = ReturnType<typeof allReducres>

export default allReducres