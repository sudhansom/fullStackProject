import mongoose, { Document } from 'mongoose'
import Users, { UserDocument } from './Users'
import OrderItem, { OrderItemDocument } from './OrderItem'

export type OrdersDocument = Document & {
  totalPrice: number
  users: UserDocument[]
  orderItem: OrderItemDocument[]
}
const ordersSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],
  orderItem: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderItem',
    },
  ],
})

export default mongoose.model<OrdersDocument>('Orders', ordersSchema)
