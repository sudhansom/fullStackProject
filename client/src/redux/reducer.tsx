import {ProductDocument} from '../../../src/models/Product'
type DefaultState = {
    product: ProductDocument | null,
    err: any
}

const defaultState: DefaultState = {
    product: null,
    err: ''
}
const reducer = (state=defaultState, action: any) => {
    switch (action.type) {
        case "PRODUCT_SUCCESS":
            return {
                ...state,
                product : action.payload,
            }

        case "ON_ERROR":
            return {
                ...state,
                err: action.payload
            }
    
        default:
            return state
    }
}

export default reducer