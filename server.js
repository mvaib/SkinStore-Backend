import express from "express"
import cors from "cors"
import { dbConnections } from "./config/db.js"
import productRouter from "./routes/product.route.js"
import userRouter from "./routes/users.route.js"
import "dotenv/config"
import cartRouter from "./routes/cart.route.js"
// app config
const app = express()
const PORT = 8080

// middleware
app.use(express.json())
app.use(cors({
    origin : "https://skin-storeclone.netlify.app",
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
}))

// api endpoint

app.use("/api/product", productRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(PORT, ()=>{
    dbConnections()
    console.log(`Server started on http://localhost:${PORT}`)
})
