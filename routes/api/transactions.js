const express = require('express')
const {
  authenticate,
  controllerWrapper,
  validation,
  validationParam,
} = require('../../middlwares')
const { transactions: transactionsController } = require('../../controllers')
const { transIdSchema, transactionSchema } = require('../../joiSchemas')
const router = express.Router()
router.use(authenticate)

router.post(
  '/expenses',
  validation(transactionSchema),
  controllerWrapper(transactionsController.addExpenses)
)
router.post(
  '/incomes',
  validation(transactionSchema),
  controllerWrapper(transactionsController.addIncomes)
)
router.delete(
  '/:transId',
  validationParam(transIdSchema),
  controllerWrapper(transactionsController.deleteTransactionById)
)

module.exports = router
