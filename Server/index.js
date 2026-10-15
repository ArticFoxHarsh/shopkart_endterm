import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import dns from 'dns'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { MongoMemoryServer } from 'mongodb-memory-server'
import customerRoutes from './routes/customer.route.js'
import productRoutes from './routes/product.route.js'
import wishlistRoutes from './routes/wishlist.route.js'
import cartRoutes from './routes/cart.route.js'
import orderRoutes from './routes/order.route.js'
const app = express()
const Port = 8001
dotenv.config()

dns.setServers(['8.8.8.8', '8.8.4.4'])

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/users', customerRoutes)
app.use('/products', productRoutes)
app.use('/wishlist', wishlistRoutes)
app.use('/cart', cartRoutes)
app.use('/orders', orderRoutes)

app.get("/",(req,res)=>{
    res.send("Hello")
})

const startServer = async () => {
    try {
        let mongoUri = process.env.MongoDB_URI

        if (!mongoUri) {
            const memoryServer = await MongoMemoryServer.create()
            mongoUri = memoryServer.getUri()
            process.env.MongoDB_URI = mongoUri
            console.log('MongoDB_URI not configured, using in-memory MongoDB')
        }

        await mongoose.connect(mongoUri)
        console.log('Db Connected')

        app.listen(Port, () => {
            console.log(`Server Started at ${Port}`)
        })
    } catch (error) {
        console.error(`Unable to start server: ${error.message}`)
        process.exitCode = 1
    }
}

startServer()