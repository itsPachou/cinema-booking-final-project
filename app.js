import express from 'express'
import { fileURLToPath } from 'url'
import v1Router from './v1Router.js'
import viewRouter from './viewRouter.js'

const app = express()

// Set pug as the templating engine
app.set('view engine', 'pug')
app.set(new URL('views', import.meta.url))

app.use(express.static(fileURLToPath(new URL('./public', import.meta.url))))

app.use('/api/v1', v1Router)
app.use('/', viewRouter)

export default app
