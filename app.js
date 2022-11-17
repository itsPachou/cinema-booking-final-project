'use strict'

import express from 'express'
import router from './router.js'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express()

// Set pug as the templating engine
app.set('view engine', 'pug')
app.set(new URL('views', import.meta.url))

app.use(express.static(fileURLToPath(new URL('./public', import.meta.url))))

app.get('/', (req, res) => {
    res.set(
        "Content-Security-Policy",
        "default-src 'self';font-src fonts.gstatic.com;style-src 'self' 'unsafe-inline' fonts.googleapis.com"
    );
    res.status(200).render('base')
})
app.use('/api/v1', router)

export default app