import express from 'express'
import passport from 'passport'

import {
  findAll,
  createUser,
  findById,
  updateUser,
  deleteUser,
} from '../controllers/user'

const router = express.Router()
router.get('/', findAll)
router.post('/', createUser)
router.get('/:userId', findById)
router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  updateUser
) //passport.authenticate('jwt', {session: false}),
router.delete('/:userId', deleteUser)

export default router
