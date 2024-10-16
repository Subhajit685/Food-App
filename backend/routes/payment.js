import express from "express";
import { check } from "../middleware/check.js";
const route = express.Router()
import Razorpay from "razorpay"
import crypto from "crypto"

route.post("/order", check, async (req, res) => {
    try {
        const instance = new Razorpay({ key_id: process.env.YOUR_KEY_ID, key_secret: process.env.key_secret })

        const options = {
            amount: req?.body.amount,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        const order = await instance.orders.create(options);
        return res.status(200).json({success : true, key : process.env.YOUR_KEY_ID, order})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})

route.post("/paymentVerification", check, async (req, res) => {

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    
        const body = razorpay_order_id + "|" + razorpay_payment_id
    
        const generated_signature = crypto.createHmac("sha256", process.env.key_secret).update(body.toString()).digest("hex")
    
        if (generated_signature == razorpay_signature) {
            res.redirect(`https://food-app-1ero.onrender.com/success-payment-order/${razorpay_payment_id}`)
        } else {
            return res.status(400).json({success : false, message : "Something wrong"})
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }

})

export default route