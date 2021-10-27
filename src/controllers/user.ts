import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../helpers/apiError'

import Users from '../models/Users'
import UserService from '../services/user'

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.user)
  try {
    res.json(await UserService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      password,
      email,
      address = [],
      order = [],
    } = req.body
    console.log('why does not this work??')
    const user = new Users({
      firstName,
      lastName,
      email,
      address,
      order,
      password,
    })
    console.log(user)
    const result = await UserService.create(user)
    const sendResult = { firstName, lastName, password, email, address, order }
    res.json(sendResult)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user
  console.log('user now:-', user)
  try {
    const update = req.body
    const userId = req.params.userId
    const updateUser = await UserService.update(userId, update)
    res.json(updateUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const deleteUser = await UserService.deleteUser(userId)
    res.json(deleteUser)
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
    const userId = req.params.userId
    const findById = await UserService.findById(userId)
    res.json(findById)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
