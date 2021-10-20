import mongoose, { Document } from 'mongoose'
import Users, { UserDocument } from './Users'
import orderItemSchema, { OrderItemDocument } from './OrderItem'

export type OrdersDocument = Document & {
  totalPrice: number
  users: UserDocument[]
  orderItem: OrderItemDocument[]
  completed: boolean
}
const ordersSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],
  orderItem: [orderItemSchema],
  completed: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model<OrdersDocument>('Orders', ordersSchema)
