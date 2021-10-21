import mongoose, { Document } from 'mongoose'

export type OrderItemDocument = Document & {
  quantity: number
  orderedDate: Date
  product: string[]
}

const orderItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    default: 0,
  },
  orderedDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
})
export default orderItemSchema
