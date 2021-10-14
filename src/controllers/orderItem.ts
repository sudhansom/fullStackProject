import { Request, Response, NextFunction } from 'express'
import OrderItem from '../models/OrderItem'
import { BadRequestError, NotFoundError } from '../helpers/apiError'
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
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await OrderItemService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid request', error))
    } else {
      next(error)
    }
  }
}
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderItemId = req.params.orderItemId
    res.json(await OrderItemService.findById(orderItemId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid request', error))
    } else {
      next(error)
    }
  }
}

export const updateOrderItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderItemId = req.params.orderItemId
    const update = req.body
    const updatedOrderItem = await OrderItemService.updateOrderItem(
      orderItemId,
      update
    )
    res.json(updatedOrderItem)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid request', error))
    } else {
      next(error)
    }
  }
}

export const deleteOrderItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderItemId = req.params.orderItemId
    const result = await OrderItemService.deleteOrderItem(orderItemId)
    res.json(result)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid request', error))
    } else {
      next(error)
    }
  }
}
