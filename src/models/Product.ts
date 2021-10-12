import mongoose, { Document } from 'mongoose'

import variantSchema, { VariantDocument } from './Variant'

export type ProductDocument = Document & {
  name: string
  price: number
  digital: boolean
  variant: VariantDocument
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },
  digital: {
    type: Boolean,
    required: true,
  },
  variant: variantSchema,
})

export default mongoose.model<ProductDocument>('Product', productSchema)
