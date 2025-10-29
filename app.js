require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const connectDB = require('./config/database')
const rateLimit = require('express-rate-limit')
const xssMiddleware = require('./middlewares/xssMiddleware')
const port = process.env.PORT || 3000

const productRoutes = require('./routes/ProductRoute')
const userRoutes = require('./routes/UserRoute')
const cartRoutes = require('./routes/CartRoutes')
const authRoutes = require('./routes/authRoutes')
const orderRoutes = require('./routes/OrderRoutes')

const app = express()

app.use(express.json())

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

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
})
app.use(limiter)

app.get('/', (req, res) => {
    res.send('Hello World !')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})

connectDB();

module.exports = app


