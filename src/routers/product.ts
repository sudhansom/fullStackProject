import express from 'express'

import { findAll, findById, createProduct } from '../controllers/product'

const router = express.Router()

router.get('/', findAll)
router.get('/', findById)
router.post('/', createProduct)

export default router
