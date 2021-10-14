import OrderItem, { OrderItemDocument } from '../models/OrderItem'

const createOrderItem = async (
  newOrderItem: OrderItemDocument
): Promise<OrderItemDocument> => {
  const result = newOrderItem.save()
  return result
}

export default { createOrderItem }
