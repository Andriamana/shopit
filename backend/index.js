import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";
import productRoute from "./routes/products.js";
const app = express();

dotenv.config({path: "./backend/config/config.env"});

//connecting to database
connectDatabase();

//import all routes
app.use("/api/v1",productRoute);

app.listen(process.env.PORT, ()=>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});