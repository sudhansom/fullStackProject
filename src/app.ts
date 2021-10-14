import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'

import userRouter from './routers/user'
import productRouter from './routers/product'
import orderRouter from './routers/order'
import orderItemRouter from './routers/orderItem'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import compression from 'compression'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 5000)
app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(compression())
app.use(express.json())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

// Use all the routers
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/orderItems', orderItemRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
