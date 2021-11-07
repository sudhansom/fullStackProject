import express, { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../helpers/apiError'
import ProductService from '../services/product'
import Product from '../models/Product'

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
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
    const productId = req.params.productId
    const result = await ProductService.findById(productId)
    res.json(result)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      images,
      price,
      digital,
      quantity,
      category,
      variant = [],
    } = req.body
    const product = new Product({
      name,
      images,
      price,
      digital,
      quantity,
      variant,
      category,
    })
    console.log('Image: ', images)
    await ProductService.createProduct(product)
    res.json(product)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId
    await ProductService.deleteProduct(productId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId
    const update = req.body
    const result = await ProductService.updateProduct(productId, update)
    console.log('HELLO HELLO HELLO')
    res.json(result)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const adminCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body)
    console.log('----0-----')
    //next()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
