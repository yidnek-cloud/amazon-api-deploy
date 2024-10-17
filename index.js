const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        Message: "success !",
    });
});

app.post("/payment/creat", async (req, res) =>{
    const total = req.query.total;
    if(total > 0) {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "used",
        });
        res.status(201).json({
            clientSecret: paymentIntent.client_secret,
        });
    }else {
        res.status(403).json({
            Message: "total must be greater than 0",
        });
    }
});

app.listen(5500, (err) => {
    if(err) throw err
    console.log("Amazon Server Runing on PORT: 5500, http://localhost:5500");
    
})
