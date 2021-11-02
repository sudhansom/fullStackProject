import mongoose, { Document } from 'mongoose'
import { ProductDocument } from './Product'

export type OrderItemDocument = Document & {
  [key: string]: ProductDocument | null
}

const orderItemSchema = new mongoose.Schema({})
export default orderItemSchema
