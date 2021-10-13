import { NotFoundError } from '../helpers/apiError'
import Orders, { OrdersDocument } from '../models/Orders'

const findAll = async (): Promise<OrdersDocument[]> => {
  return Orders.find()
}

const findById = async (orderId: string): Promise<OrdersDocument[]> => {
  const foundOrder = await Orders.findById(orderId)
  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }
  return Orders.find()
}
const createOrder = async (
  newOrder: OrdersDocument
): Promise<OrdersDocument> => {
  return newOrder.save()
}

const updateOrder = async (
  orderId: string,
  update: Partial<OrdersDocument>
): Promise<OrdersDocument | null> => {
  const foundOrder = await Orders.findByIdAndUpdate(orderId, update, {
    new: true,
  })
  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }

  return foundOrder
}

const deleteOrder = async (orderId: string): Promise<OrdersDocument | null> => {
  const foundOrder = Orders.findByIdAndDelete(orderId)

  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }

  return foundOrder
}

export default {
  findAll,
  findById,
  createOrder,
  updateOrder,
  deleteOrder,
}
