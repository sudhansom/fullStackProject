import mongoose, { Document } from 'mongoose'

export type AddressDocument = Document & {
  street: string
  houseNo: number
  postalCode: number
  city: string
  country: string
}

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  houseNo: {
    type: Number,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
})

export default addressSchema
