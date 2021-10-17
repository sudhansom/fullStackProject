import { NotFoundError } from '../helpers/apiError'
import OrderItem, { OrderItemDocument } from '../models/OrderItem'

// import app from '../app'
// const userName = app.get('userName')

const createOrderItem = async (
  newOrderItem: OrderItemDocument
): Promise<OrderItemDocument> => {
  const result = newOrderItem.save()
  return result
}

const findAll = async () => {
  return await OrderItem.find()
}

const findById = async (orderItemId: string) => {
  return await OrderItem.findById(orderItemId)
}

const updateOrderItem = async (
  orderItemId: string,
  update: OrderItemDocument
): Promise<OrderItemDocument> => {
  const foundOrderItem = await OrderItem.findByIdAndUpdate(
    orderItemId,
    update,
    { new: true }
  )
  if (!foundOrderItem) {
    throw new NotFoundError(`Product ${orderItemId} not found`)
  }
  return foundOrderItem
}

const deleteOrderItem = async (
  orderItemId: string
): Promise<OrderItemDocument | null> => {
  const foundOrderItem = await OrderItem.findByIdAndDelete(orderItemId)

  if (!foundOrderItem) {
    throw new NotFoundError(`OrderItem ${orderItemId} not found`)
  }
  return foundOrderItem
}

export default {
  createOrderItem,
  findAll,
  findById,
  updateOrderItem,
  deleteOrderItem,
}
