import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'
import jwt_decode from 'jwt-decode'

import userRouter from './routers/user'
import productRouter from './routers/product'
import orderRouter from './routers/order'
import orderItemRouter from './routers/orderItem'
import loginRouter from './routers/login'
import { googleStrategy, jwtStrategy } from './config/passport'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import compression from 'compression'
import passport from 'passport'
import cors from 'cors'

dotenv.config({ path: '.env' })
const app = express()

app.use(cors())
// Express configuration
app.set('port', process.env.PORT || 5000)
// app.set('userName', process.env.USER1)
app.use(passport.initialize())
passport.use(googleStrategy)
passport.use(jwtStrategy)
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
app.use('/api/v1/google/login', loginRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
