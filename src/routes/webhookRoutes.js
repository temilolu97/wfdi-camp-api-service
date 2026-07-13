const express = require('express');
const { receiveWebhook } = require('../controllers/webhookController');

const {Router} = express

const router = Router()

router.post('/budpay', receiveWebhook)


module.exports = router;