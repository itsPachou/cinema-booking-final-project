'use strict'

import express from 'express'
import router from './router.js'

const app = express()

app.use('/api/v1', router)

export default app