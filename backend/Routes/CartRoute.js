const express =require("express");
const { addToCart,removeCart,getCartItem } = require("../controllers/cartController");
const authMiddleWare = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/addToCart",authMiddleWare,addToCart);
userRouter.post("/removeCart",authMiddleWare,removeCart);
userRouter.get("/getCartItem",authMiddleWare,getCartItem);


module.exports = userRouter