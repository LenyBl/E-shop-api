require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const connectDB = require('./config/database')

const productRoutes = require('./routes/ProductRoute')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World !')
})

app.use('/api/products', productRoutes)

app.listen(port, () => {
    console.log(`Server started on https://localhost:${port}`)
})

connectDB();

module.exports = app


