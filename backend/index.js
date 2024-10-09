import express from 'express'
import { dbconnection } from './config/db.js'
import foodRoute from "./routes/food.js"
import userRoute from "./routes/user.route.js"
import cartRoute from "./routes/cart.js"
import orderRoute from "./routes/orderroute.js"
import cors from "cors"
import cookieParser from 'cookie-parser'
import path from "path"
import dotenv from "dotenv"


dotenv.config()
const PORT = process.env.PORT || 4000
const app = express()
dbconnection()

const _dirname = path.resolve();


app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174"],
    credentials:true,
    methods : ["POST", "GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/food", foodRoute)
app.use("/api/user", userRoute)
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)
app.use("/images", express.static("uploads"))


// app.use(express.static(path.join(_dirname, "/frontend/dist")));
// app.get('*', (req,res) => {
//     res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
// });

app.listen(PORT, ()=>{
    console.log("server connected at "+ PORT)
})



