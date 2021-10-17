import mongoose, { Document } from 'mongoose'

export type OrderItemDocument = Document & {
  quantity: number
  orderedDate: Date
  product: string[]
  order: string[]
}

const orderItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
  },
  orderedDate: {
    type: Date,
    required: true,
  },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
})
export default mongoose.model<OrderItemDocument>('OrderItem', orderItemSchema)
