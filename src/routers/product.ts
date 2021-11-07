import express from 'express'
import passport from 'passport'

import {
  findAll,
  findById,
  createProduct,
  deleteProduct,
  updateProduct,
  adminCheck,
} from '../controllers/product'

const router = express.Router()

router.get('/', findAll)
router.get('/:productId', findById)
router.post('/', createProduct)
router.delete('/:productId', deleteProduct)
router.put(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  updateProduct
)

export default router
