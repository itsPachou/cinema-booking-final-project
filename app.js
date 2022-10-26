const express = require('express')
const router = require('./router.js')

const app = express()

app.use('/api/v1', router)

const port = 3000
app.listen(port, () => {
    console.log(`Listing on port ${port}`)
})