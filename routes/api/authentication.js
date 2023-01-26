const { Router } = require('express')
const { controllerWrapper } = require('../../middlwares')
const { authentication: authController } = require('../../controllers')

const router = Router()

router.get('/google', controllerWrapper(authController.googleAuth))
router.get('/google-redirect', controllerWrapper(authController.googleRedirect))

module.exports = router
