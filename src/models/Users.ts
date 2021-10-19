import mongoose, { Document } from 'mongoose'
import addressSchema, { AddressDocument } from './Address'

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  address: AddressDocument[]
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    index: true,
  },
  lastName: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: [addressSchema],
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
})
export default mongoose.model<UserDocument>('User', userSchema)