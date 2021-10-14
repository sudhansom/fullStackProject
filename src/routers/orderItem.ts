import express from 'express'

import { createOrderItem } from '../controllers/orderItem'

const router = express.Router()

router.post('/', createOrderItem)

export default router
