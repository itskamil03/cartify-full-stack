import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// ================= APP CONFIG =================
const app = express()
const port = process.env.PORT || 4000

// ================= DB + CLOUD =================
connectDB()
connectCloudinary()

// ================= MIDDLEWARES =================
app.use(express.json())

// ✅ Better CORS (important for frontend)
app.use(cors({
    origin: '*',
    credentials: true
}))

// ================= API ROUTES =================
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// ================= HEALTH CHECK =================
app.get('/', (req, res) => {
    res.send("API Working 🚀")
})

// ================= GLOBAL ERROR HANDLER =================
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        success: false,
        message: "Something went wrong"
    })
})

// ================= SERVER START =================
app.listen(port, () => {
    console.log(`🚀 Server started on PORT: ${port}`)
})