import express from 'express'
import passport from 'passport'

import {
  findAll,
  createUser,
  findById,
  updateUser,
  deleteUser,
  emailPasswordCheck,
} from '../controllers/user'

const router = express.Router()
router.get('/', findAll)
router.post('/', createUser)
router.get('/:userId', findById)
router.post('/login', emailPasswordCheck)
router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  updateUser
) //passport.authenticate('jwt', {session: false}),
router.delete('/:userId', deleteUser)

export default router
