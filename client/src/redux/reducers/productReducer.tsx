import Product, { ProductDocument } from "../../../../src/models/Product"

type State = {
    product: ProductDocument,
    err: any,
}
const defaultState: State = {
    product: {},
    err: "",
}

export const productReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case "SUCCESS_PRODUCT":
            const result = action.payload
            return{
                ...state,
                product: result
            }
            
        case "ON_ERROR":
            return {
                ...state,
                err: action.payload
            }
    
        default:
            return {
                state
            }
    }
}