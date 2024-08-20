const express = require("express");
const multer =require("multer");
const {addFood,listFood,removeFood} = require("../controllers/foodController");

const foodRouter = express.Router();


// Image Storage

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        console.log(file.originalname); // Corrected property name to "originalname"
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);




module.exports = foodRouter;