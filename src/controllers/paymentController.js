const { verifyPayment } = require("../integrations/BudpayIntegration")

const paymentVerification =async (req,res)=>{
    const {reference} = req.query
    const response = await verifyPayment(reference);

    const status = response.data.status

    return res.status(200).json({
        message:"Status fetched successfully",
        status:status
    })
    

}

module.exports = {
    paymentVerification
}