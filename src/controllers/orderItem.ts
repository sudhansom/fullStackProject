import { Request, Response, NextFunction } from 'express'
import OrderItem from '../models/OrderItem'
import { NotFoundError } from '../helpers/apiError'
import OrderItemService from '../services/orderItem'

export const createOrderItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { quantity, product = [], order = [] } = req.body
    const newOrderItem = new OrderItem({
      quantity,
      product,
      order,
    })
    const result = await OrderItemService.createOrderItem(newOrderItem)
    res.json(result)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new NotFoundError('Invalid Input', error))
    } else {
      next(error)
    }
  }
}
