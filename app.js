const express = require('express')
const app = express()
require('dotenv').config()

const baseRoute = require('./routes/base.route')

app.use(baseRoute)

app.listen(process.env.PORT, () => {
    console.log("Application running at ", process.env.PORT)
})