import { OrdersDocument } from '../../../../src/models/Orders'
import { ProductDocument } from '../../../../src/models/Product'
export type DefaultProductState = {
  product: ProductDocument[]
  err: any
  order: OrdersDocument[]
  oneProduct: ProductDocument | null
}

const defaultState: DefaultProductState = {
  product: [],
  err: '',
  order: [],
  oneProduct: null,
}
const productReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case 'PRODUCT_SUCCESS':
      const currentProduct = state.product
      return {
        ...state,
        product: action.payload,
      }

    case 'ON_ERROR_PRODUCT':
      return {
        ...state,
        err: action.payload,
      }
    case 'SAVE_ORDER':
      return {
        ...state,
        order: action.payload,
      }
    case 'SUCCESS_ONE_PRODUCT':
      return {
        ...state,
        oneProduct: action.payload,
      }

    default:
      return state
  }
}

export default productReducer
