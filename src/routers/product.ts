import express from 'express'

import {
  findAll,
  findById,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/product'

const router = express.Router()

router.get('/', findAll)
router.get('/:productId', findById)
router.post('/', createProduct)
router.delete('/:productId', deleteProduct)
router.put('/:productId', updateProduct)

export default router