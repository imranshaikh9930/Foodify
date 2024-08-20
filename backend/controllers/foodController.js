const foodModel = require("../models/food.models");
const fs=  require("fs");

const addFood = async(req,res)=>{
    
    let image_file = `${req.file.filename}`;

    // console.log(image_file);
    console.log(req.body.description);

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price :req.body.price,
        image:image_file,
        category:req.body.category,
    })

    try {
        await food.save();

        res.json({success:true,message:"Food Added"})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:"Error"})
    }
}

const listFood = async(req,res)=>{
    try {
        
        const food = await foodModel.find({});
        res.json({success:true,data:food});
    } catch (error) {
        console.log(error);
        res.send({success:false,message:'Error'});  
    }
}

const removeFood = async(req,res)=>{

    console.log(req.body.id);
    try {

      const food =  await foodModel.findById(req.body.id);

    //   console.log(food);
    //   Remove image from uploads folder;
    fs.unlink(`uploads/${food.image}`, () => {});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})

    } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"});
    }
}
module.exports = {addFood,listFood,removeFood};