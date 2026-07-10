const express = require('express')
const { initiateRegistration } = require('../controllers/registrationController')

const {Router} = express

const router = Router()

router.post('/initiate', initiateRegistration)


module.exports = router;