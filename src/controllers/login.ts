import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../helpers/apiError'
import UserService from '../services/user'
import { UserDocument } from '../models/Users'

import jwt from 'jsonwebtoken'
import passport from 'passport'

import { JWT_SECRET } from '../util/secrets'

export const findOrCreate = (req: Request, res: Response) => {
  //const user = UserService.findOrCreate('a', 'b', 'c')
  console.log('in loginControllers:-', req.user)
  const userData = req.user as UserDocument
  try {
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '2h' })
  } catch (error) {
    console.log('error....while creating token')
  }
  //console.log(token)
  console.log('userData:', userData)
  res.json({ token: userData })
}
