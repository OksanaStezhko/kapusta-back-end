const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const authRouter = require('./routes/api/authentication')
const usersRouter = require('./routes/api/users')
const categoriesRouter = require('./routes/api/categories')
const reportsRouter = require('./routes/api/reports')
const transactionsRouter = require('./routes/api/transactions')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/transactions', transactionsRouter)
app.use('/api/reports', reportsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found!' })
})

app.use((error, req, res, next) => {
  const { status = 500, message = 'Server error' } = error
  res.status(status).json({ message })
})

module.exports = app
