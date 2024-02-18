import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";
import productRoute from "./routes/products.js";
import errorMiddleware from "./middlewares/errors.js";

const app = express();

dotenv.config({path: "./backend/config/config.env"});

//connecting to database
connectDatabase();

app.use(express.json());

//import all routes
app.use("/api/v1",productRoute);

//using error middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

//Handle unhandled promise rejections
process.on("unhandledRejection",(err) => {
    console.log(`ERROR: ${err}`);
    console.log("Shutting down server due to unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});


//Handle Uncaught exceptions
process.on ("uncaughtException", (err) => {
    console.log (`ERROR: ${err}`);
    console.log ("Shutting down due to uncaught exception");
    process.exit(1);
});








