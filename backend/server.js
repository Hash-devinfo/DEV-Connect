import express from 'express'
import cors from "cors"
import 'dotenv/config'
import { connectDB } from './config/db.js'
import authRoutes from "./routes/authRoutes.js"
import projectRoutes from "./routes/projectRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";


const app = express()

const PORT = process.env.PORT


// MIDDLEWEARES
app.use(express.json())



// DB
connectDB();


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}))

// ROUTES
app.use("/auth", authRoutes)
app.use("/projects", projectRoutes); 
app.use("/bids", bidRoutes);


app.get("/", (req,res)=>{
    res.json("API WORKING")
})

app.listen(PORT, ()=>{
    console.log(`SERVERSTARTED ON  http://localhost:${PORT}`)
})