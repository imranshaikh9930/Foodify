const express = require("express");
const cors = require("cors");
const connectDb  = require("./config/db.js");
const userRouter = require("./Routes/UserRoute.js");
const foodRouter = require("./Routes/FoodRoute.js");
const cartRouter = require('./Routes/CartRoute.js');
const orderRouter = require("./Routes/OrderRoute.js");
require("dotenv").config();
const app = express();


// Config
const PORT = 4000;

// MiddleWare
app.use(express.json());
app.use(cors());

// Db
connectDb();


// Api endpoints
app.use("/api/user",userRouter)
app.use("/api/food",foodRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.use("/images",express.static('uploads')) // display images on /images/image in db 

app.get("/",(req,res)=>{
    res.send("Server Running ")
})

app.listen(PORT,()=>{

    console.log(`Server is Running on Port ${PORT}`);
})

