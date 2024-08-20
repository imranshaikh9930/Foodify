const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.models");

const createToken = (userId)=>{
    return jwt.sign({userId},process.env.JWT_SECRET);

}
const registerUser = async(req,res)=>{
    const {name,email, password } =req.body;

    try {
        const emailExist  = await  UserModel.findOne({email});

        if(emailExist){
         return res.json({success:false,message:"User Already Exists"})
        }
    
        // Validating Email format;
    
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"});
        }
    
        if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password"});
        }
    
        // Hashing Password;
        const salt = 10
        const hashedPassword  = await bcrypt.hash(password,salt);
    
        const newUser = new UserModel({
            name:name,
            email:email,
            password:hashedPassword
        });
    
       const user =  await newUser.save();
    
       // generate Token
    
       const token =  createToken(user._id);
        res.json({success:true,token});
    } catch (error) {

        console.log(error);
        res.json({success:false,message:error});
    }

 

}

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        
        const user = await UserModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User does not exist"});
        }

        const isMatch = await bcrypt.compare(password,user.password);


        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"});

        };

        const token  = createToken(user._id);
        res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error})
    }
}


module.exports = {registerUser,loginUser};
