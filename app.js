'use strict'

import express from 'express'
import router from './router.js'

const app = express()

// Set pug as the templating engine
app.set('view engine', 'pug')
app.set(new URL('views', import.meta.url))

app.use(express.static(new URL('public', import.meta.url).toString()))

app.get('/', (req, res) => {
    res.status(200).render('base')
})
app.use('/api/v1', router)

export default app