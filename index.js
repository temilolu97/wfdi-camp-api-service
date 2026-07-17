const express = require('express')
const cors = require('cors')
const { connectDB, sequelize } = require('./src/config/db.js');
require('dotenv').config();
const registrationRoutes = require('./src/routes/registrationRoutes.js')
const webhookRoutes = require('./src/routes/webhookRoutes.js')
const paymentRoutes = require('./src/routes/paymentRoutes.js')

const app = express()

app.use(cors({
    origin: [
        "https://camp.wfding.com",
        "https://staging.camp.wfding.com",
        "http://localhost:5173"
    ],
    credentials: true
}));
app.use(express.json())
app.use("/registrations", registrationRoutes);
app.use('/webhook', webhookRoutes)
app.use('/payments', paymentRoutes)
const PORT = process.env.PORT || 3000;

connectDB()

app.get('/',(req,res)=>{
    return res.status(200).json({
        message:"App is up and running"
    })
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

