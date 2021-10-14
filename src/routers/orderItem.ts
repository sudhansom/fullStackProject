import express from 'express'

import {
  createOrderItem,
  findAll,
  findById,
  updateOrderItem,
  deleteOrderItem,
} from '../controllers/orderItem'

const router = express.Router()

router.post('/', createOrderItem)
router.get('/', findAll)
router.get('/:orderItemId', findById)
router.put('/:orderItemId', updateOrderItem)
router.delete('/:orderItemId', deleteOrderItem)

export default router
