import express from "express";
import  cors  from "cors";
import dotenv from  "dotenv"
import helmet from "helmet"
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import kpiRouter from  "./routers/kpi.js";
import productRouter from "./routers/products.js"
import transactionRouter from "./routers/transactions.js"
// import Transaction from "./model/transactions.js";
// import { transactions } from "./data.js";
// import { kpis } from "./data.js";
// import KPI from "./model/kpi.js";
// import { products } from "./data.js";
// import Product from "./model/products.js";

const ConectTodb = async()=>{
    // await mongoose.connect(`mongodb://127.0.0.1:27017/finance`)
    await mongoose.connect(process.env.DB_URL,  { useNewUrlParser: true, useUnifiedTopology: true }  )
    
    console.log("DB connection sucessful")
    // await mongoose.connection.db.dropDatabase()
    // console.log("Inserting data")
    // await KPI.insertMany(kpis)
    // await Product.insertMany(products)
    // await Transaction.insertMany(transactions)
    // console.log("inserting accomplished succesfully")
}

const app = express()

// configurations
dotenv.config()
app.use(cors())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.use( "/kpi" ,kpiRouter)
app.use("/product",productRouter )
app.use("/transaction", transactionRouter)


app.listen((process.env.PORT), ()=>{
    console.log("Connected to backend on PORT:"+ process.env.PORT)
    ConectTodb()
})