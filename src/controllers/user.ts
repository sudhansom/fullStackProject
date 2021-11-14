import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../helpers/apiError'

import Users, { UserDocument } from '../models/Users'
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
      role = '',
    } = req.body
    const newUser = new Users({
      firstName,
      lastName,
      email,
      address,
      order,
      password,
      role,
    })
    console.log(newUser)
    const result = await UserService.create(newUser)
    const sendResult = {
      firstName,
      lastName,
      password,
      email,
      address,
      order,
      role,
    }
    const user = { firstName, lastName, password, email, address, order, role }
    req.user = user
    next()
    //res.json(sendResult)
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
  console.log('user now:-', req.body)
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

export const emailPasswordCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email: string = req.body.email
    const password: string = req.body.password
    const user: UserDocument | null = await UserService.findByEmail(email)
    if (user) {
      req.user = user
    }
    if (user && user.password == password) {
      user.password = ''
      console.log('password  matched.... congrats...', user)
      next()
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('inside controller reg user...')
  try {
    const {
      firstName,
      lastName,
      password,
      email,
      address = [],
      order = [],
      role = '',
    } = req.body
    const newUser = new Users({
      firstName,
      lastName,
      email,
      address,
      order,
      password,
    })
    console.log('userRegistered', newUser)
    const result = await UserService.create(newUser)
    const user = { firstName, lastName, password, email, address, order }
    req.user = user
    next()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
