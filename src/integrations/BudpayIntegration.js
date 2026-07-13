const { default: axios } = require("axios")


const initiatePayment = async (email, amount, reference) => {
    var token = process.env.BUDPAY_SECRET_KEY
    var baseUrl = process.env.BUDPAY_BASE_URL
    var payload = {
        email,
        amount: amount.toString(),
        reference,
        currency: "NGN",
        callback: process.env.BUDPAY_CALLBACK_URL
    }
    var response = await axios.post(`${baseUrl}/api/v2/transaction/initialize`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
    return response.data
}

const verifyPayment = async (reference) => {
    var token = process.env.BUDPAY_SECRET_KEY
    var baseUrl = process.env.BUDPAY_BASE_URL
    
    var response = await axios.get(`${baseUrl}/api/v2/transaction/verify/${reference}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
    return response.data
}

module.exports = {
    initiatePayment,
    verifyPayment
}