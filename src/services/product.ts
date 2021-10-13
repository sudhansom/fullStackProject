import Product, { ProductDocument } from '../models/Product'
import { NotFoundError } from '../helpers/apiError'

const findById = async (productId: string): Promise<ProductDocument> => {
  const foundProduct = await Product.findById(productId)

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }
  return foundProduct
}

const findAll = async (): Promise<ProductDocument[]> => {
  return Product.find().sort({ name: 1 })
}

const create = async (product: ProductDocument): Promise<ProductDocument> => {
  return product.save()
}

export default { findById, findAll, create }
