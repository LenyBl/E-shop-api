require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const connectDB = require('./config/database')
const rateLimit = require('express-rate-limit')
const xssMiddleware = require('./middlewares/xssMiddleware')
const port = process.env.PORT || 3000
const mongoSanitize = require('express-mongo-sanitize')
const errorHandler = require('./middlewares/errorHandler')
const morgan = require('morgan')
const logger = require('./utils/logger')

const productRoutes = require('./routes/ProductRoute')
const userRoutes = require('./routes/UserRoute')
const cartRoutes = require('./routes/CartRoute')
const authRoutes = require('./routes/authRoute')
const orderRoutes = require('./routes/OrderRoute')
const categoryRoutes = require('./routes/CategoryRoute')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  if (req.body) {
    req.body = mongoSanitize.sanitize(req.body);
  }
  next();
});

app.use(helmet())

app.use(xssMiddleware)

app.use(cors(
    {
        origin: ['http://localhost:3000', 'https://yourdomain.com'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
))

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
} else {
    app.use(morgan('combined', {
        stream: {
            write: (message) => logger.info(message.trim())
        }
    }))
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
})
app.use(limiter)

app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('Hello World !')
})

app.get('/error', (req, res) => {
    throw new Error('Test error handling middleware')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/categories', categoryRoutes)

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})

connectDB();

module.exports = app


