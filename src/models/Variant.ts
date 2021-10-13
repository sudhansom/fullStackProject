import mongoose, { Document } from 'mongoose'

export type VariantDocument = Document & {
  brand: string
  size: string
  color: string
}

const variantSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
})

export default variantSchema
