const jwt = require("jsonwebtoken");

const authMiddleware = async(req,res,next)=>{

    const {token} = req.headers;

    if(!token){
        return res.json({success:false,message:"Not Authorized Please Login"});

    }

    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);

        console.log(token_decode);
        req.body.userId = token_decode.userId;
        next();
    } catch (error) {
        return res.json({success:false,message:error})
    }
}

module.exports = authMiddleware;