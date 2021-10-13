import express from 'express'
import {
  findAll,
  createOrder,
  findById,
  updateOrder,
  deleteOrder,
} from '../controllers/order'

const router = express.Router()

router.get('/', findAll)
router.get('/:orderId', findById)
router.put('/:orderId', updateOrder)
router.delete('/:orderId', deleteOrder)
router.post('/', createOrder)

export default router
