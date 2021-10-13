import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'

import movieRouter from './routers/movie'
import userRouter from './routers/user'
import productRouter from './routers/product'
import orderRouter from './routers/order'

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

// Use movie router
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', orderRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
