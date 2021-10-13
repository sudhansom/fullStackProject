import express from 'express'

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
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router
