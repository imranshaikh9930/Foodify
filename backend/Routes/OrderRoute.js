const express = require("express");
const authMiddleware = require("../middleware/auth");
const { listOrders, userOrders, placeOrder, updateStatus, verifyOrder } = require("../controllers/orderController");


const orderRouter = express.Router();


orderRouter.get("/list",listOrders);
orderRouter.post("/userOrder",authMiddleware,userOrders);
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/status",updateStatus);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/placecod",authMiddleware,placeOrder);

module.exports = orderRouter;