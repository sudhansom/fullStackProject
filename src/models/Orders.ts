import mongoose, { Document } from 'mongoose'
import Users, { UserDocument } from './Users'
import OrderItem, { OrderItemDocument } from './OrderItem'

export type OrdersDocument = Document & {
  totalPrice: number
  orderedDate: Date
  users: UserDocument
  orderItem: OrderItemDocument[]
}
const ordersSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    required: true,
  },
  orderedDate: {
    type: Date,
    required: true,
  },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  orderItem: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderItem',
      required: true,
    },
  ],
})

export default mongoose.model<OrdersDocument>('Orders', ordersSchema)
