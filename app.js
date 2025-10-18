require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const dbHost = process.env.DB_HOST 
const mongoose = require('mongoose')


app.get('/', (req, res) => {
    res.send('Hello World !')
})

app.listen(port, () => {
    console.log('Server started https://localhost:3000')
})


mongoose.connect(dbHost)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err))


module.exports = app


