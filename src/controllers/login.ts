import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../helpers/apiError'
import UserService from '../services/user'

import passport from 'passport'

export const findOrCreate = (req: Request, res: Response) => {
  //const user = UserService.findOrCreate('a', 'b', 'c')
  console.log('in loginControllers:-', req.user)
  res.json('login successfull....')
}
