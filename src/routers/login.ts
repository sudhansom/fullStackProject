import express, { Request, Response } from 'express'
import passport from 'passport'
import { findOrCreate } from '../controllers/login'

const router = express.Router()

router.post(
  '/',
  passport.authenticate('google-id-token', { session: false }),
  findOrCreate
)

// router.post(
//   '/',
//   passport.authenticate('google-id-token', { session: false }),
//   (req: Request, res: Response) => {

//       console.log('return:----',req.user)
//     res.json('login successfull')
//   }
// )

export default router
