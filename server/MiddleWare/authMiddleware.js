const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const  User = require("../Models/userModel")


const protect = expressAsyncHandler (async(req,res,next) =>{
 let token;
try{
     if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    token = req.headers.authorization.split(" ")[1]

    let decoded = jwt.verify(token,process.env.JWT_secret)
    req.user = await User.findById(decoded.id).select("-password")
    next();
 }else{
    res.status(401);
            throw new Error("Token is missing or invalid.");
 }
}catch(error){
            res.status(401);
        throw new Error("Invalid or expired token.");
}
})
module.exports = protect;