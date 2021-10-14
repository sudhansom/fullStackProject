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

const createProduct = async (
  product: ProductDocument
): Promise<ProductDocument> => {
  return product.save()
}

const deleteProduct = async (productId: string) => {
  const foundProduct = await Product.findByIdAndDelete(productId)

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }
  return foundProduct
}
const updateProduct = async (productId: string, update: ProductDocument) => {
  const foundProduct = await Product.findByIdAndUpdate(productId, update, {
    new: true,
  })

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found.`)
  }
  return foundProduct
}
export default {
  findById,
  findAll,
  createProduct,
  updateProduct,
  deleteProduct,
}
