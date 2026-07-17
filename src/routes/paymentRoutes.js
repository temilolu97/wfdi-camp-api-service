const express = require('express')
const {  paymentVerification } = require('../controllers/paymentController')

const {Router} = express

const router = Router()

router.get('/verify', paymentVerification)

module.exports = router;