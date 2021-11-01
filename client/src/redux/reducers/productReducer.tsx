import {ProductDocument} from '../../../../src/models/Product'
export type DefaultProductState = {
    product: ProductDocument[]
    err: any
}

const defaultState: DefaultProductState = {
    product: [],
    err: ''
}
const productReducer = (state=defaultState, action: any) => {
    switch (action.type) {
        case "PRODUCT_SUCCESS":
            const currentProduct = state.product
            return {
                ...state,
                product :  action.payload
            }

        case "ON_ERROR_PRODUCT":
            return {
                ...state,
                err: action.payload
            }
    
        default:
            return state
    }
}

export default productReducer