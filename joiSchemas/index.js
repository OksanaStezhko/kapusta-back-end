const userLoginSchema = require('./userLogin')
const userRegistrySchema = require('./userRegistry')
const signValueSchema = require('./signValue')
const categorySchema = require('./category')
const transIdSchema = require('./transId')
const transactionSchema = require('./transaction')
const reportsQuerySchema = require('./reportsQuery')
const reportsByYearParamSchema = require('./reportsByYearQuery')
const balanceUpdateSchema = require('./balanceUpdate')
const nameEnUpdateSchema = require('./nameEnUpdate')

module.exports = {
  userLoginSchema,
  userRegistrySchema,
  signValueSchema,
  categorySchema,
  transIdSchema,
  transactionSchema,
  reportsQuerySchema,
  reportsByYearParamSchema,
  balanceUpdateSchema,
  nameEnUpdateSchema,
}
