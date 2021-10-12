import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  address: string[]
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
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
  ],
})
export default mongoose.model<UserDocument>('User', userSchema)
