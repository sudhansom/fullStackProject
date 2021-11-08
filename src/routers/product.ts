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
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createProduct
)
router.delete(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  deleteProduct
)
router.put(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  adminCheck,
  updateProduct
)

export default router
