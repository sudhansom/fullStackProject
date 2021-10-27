import express from 'express'
import passport from 'passport'
import { findOrCreate } from '../controllers/login'

import {
  findAll,
  createUser,
  findById,
  updateUser,
  deleteUser,
  emailPasswordCheck,
  registerUser,
} from '../controllers/user'

const router = express.Router()
router.get('/', findAll)
router.post('/', createUser)
router.get('/:userId', findById)
router.post('/login', emailPasswordCheck, findOrCreate)
router.post('/register', registerUser, findOrCreate)
router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  updateUser
) //passport.authenticate('jwt', {session: false}),
router.delete('/:userId', deleteUser)

export default router
