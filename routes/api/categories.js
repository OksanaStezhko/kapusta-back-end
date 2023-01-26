const express = require('express')
const {
  signValueSchema,
  categorySchema,
  nameEnUpdateSchema,
} = require('../../joiSchemas')
const {
  controllerWrapper,
  validationParam,
  validation,
  validationQuery,
  authenticate,
} = require('../../middlwares')
const { categories: categoriesController } = require('../../controllers')

const router = express.Router()

router.use(authenticate)

router.get(
  '/:signValue',
  validationParam(signValueSchema),
  controllerWrapper(categoriesController.getCategoriesBySign)
)

router.get('/', controllerWrapper(categoriesController.getAllCategories))

router.post(
  '/',
  validation(categorySchema),
  controllerWrapper(categoriesController.addCategory)
)
router.patch(
  '/',
  validationQuery(nameEnUpdateSchema),
  controllerWrapper(categoriesController.updateNameEn)
)

module.exports = router
