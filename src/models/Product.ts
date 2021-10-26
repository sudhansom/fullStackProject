import mongoose, { Document } from 'mongoose'

import variantSchema, { VariantDocument } from './Variant'

export type ProductDocument = Document & {
  name: string
  images: string[]
  price: number
  digital: boolean
  variant: VariantDocument[]
  quantity: number
  category: string
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  images: [String],
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  digital: {
    type: Boolean,
    required: true,
  },
  variant: [variantSchema],
  category: {
    type: String,
    required: true,
    index: true,
  },
})

export default mongoose.model<ProductDocument>('Product', productSchema)
