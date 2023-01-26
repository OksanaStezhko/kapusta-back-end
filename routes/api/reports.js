const express = require('express')
const {
  authenticate,
  controllerWrapper,
  validationQuery,
} = require('../../middlwares')
const { reports: reportsController } = require('../../controllers')
const {
  reportsQuerySchema,
  reportsByYearParamSchema,
} = require('../../joiSchemas')
const router = express.Router()
router.use(authenticate)

router.get(
  '/detals',
  validationQuery(reportsQuerySchema),
  controllerWrapper(reportsController.detalsTransactions)
)

router.get(
  '/group-by-category',
  validationQuery(reportsQuerySchema),
  controllerWrapper(reportsController.groupByCategory)
)

router.get(
  '/year-report',
  validationQuery(reportsByYearParamSchema),
  controllerWrapper(reportsController.getReportByTrans)
)

module.exports = router
