const expressAsyncHandler = require("express-async-handler")
const User = require('../Models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const login = expressAsyncHandler (async(req,res) =>{
    const {email,password} = req.body

    // check all field
    if(!email||!password){
        res.status(400)
        throw new Error("give all requirement feilds")
    }
    const user = await User.findOne({email})
    // first password is written(req.body) password
    if(user && await bcrypt.compare(password,user.password)){
        res.status(201).json({
            id : user._id,
            email :user.email,
            name : user.name,
            isAdmin :user.isAdmin,
             isApproved : user.isApproved,
                   token: generateToken(user._id)
        })
    }
})
const register = expressAsyncHandler(async(req,res) =>{
     const {name , email,password,phone} = req.body
    
    //  check that all the feild user gave or not 
    if(!name||!phone||!email||!password){
        res.status(400)
        throw new Error("fill all the details")
    }
    // then check user already exist or not 
    // left side email save in my mongoDB
    const emailExist = await User.findOne({email : email})
    const phoneExist = await User.findOne({phone : phone})

    if(emailExist || phoneExist) {
        res.status(400)
        throw new Error("user already exist")
    }

    //  hash password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password,salt)
    // create new user
    const user = await User.create({
        name,email,password : hashedPassword,phone
    })

    if(!user){
    res.status(400)
    throw new Error("user not created !")
    }
    res.status(201).json({name : user.name,
        email : user.email,
        id: user._id,
        isAdmin : user.isAdmin,
        isApproved : user.isApproved,
               token: generateToken(user._id)
    })

    

})
const generateToken = (id) => {
    return jwt.sign({id : id } , process.env.JWT_secret , { expiresIn: "30d" });

}
module.exports = {login,register}