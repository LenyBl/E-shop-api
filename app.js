require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const connectDB = require('./config/database')

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World !')
})

app.listen(port, () => {
    console.log('Server started https://localhost:3000')
})



module.exports = app


