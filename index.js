const express = require('express')
const { connectDB, sequelize } = require('./src/config/db.js');
require('dotenv').config();
const registrationRoutes = require('./src/routes/registrationRoutes.js')
const webhookRoutes = require('./src/routes/webhookRoutes.js')

const app = express()

app.use(express.json())
app.use("/registrations", registrationRoutes);
app.use('/webhook', webhookRoutes)
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

