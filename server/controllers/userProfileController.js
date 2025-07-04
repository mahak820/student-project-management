const expressAsyncHandler = require("express-async-handler")
const UserPofile = require("../Models/userProfileModel")


// add profile
const addUserProfile = expressAsyncHandler ( async (req,res) =>{
   const {linkedin,github,course,collage,experience,year} = req.body

   
  const profile = await UserPofile.create( {
    course,
    linkedin,github,isComplete : true,
    collage,experience,year,user : req.user.id
  })
   const populatedprofile = await profile.populate('user' , 'name , email')
  if(!profile) {
        res.status(400) 
    throw new Error ("profile not created") 
  }
  res.status(200).json(populatedprofile)
})
// update their profile
const updateUserProfile = expressAsyncHandler(async (req,res) =>{
   const userprofile = await UserPofile.findOne({user : req.user.id})
  const updatedprofile = await UserPofile.findByIdAndUpdate(userprofile._id,req.body,{new : true})
   const populatedupdatedprofile = await updatedprofile.populate([
         { path: "user", select: "name" },
         
       ]);
  if(!updatedprofile) {
        res.status(400) 
    throw new Error ("profile not updated") 
  }
  res.status(200).json(populatedupdatedprofile)
})
// get user profile
const getUserProfile = expressAsyncHandler(async (req,res) =>{

  const userprofile = await UserPofile.findOne({user : req.user._id})
  //  const populatedProfile = await userprofile.populate([
  //        { path: "user", select: "name" },
         
  //      ]);
  //  if(!userprofile) {
  //       res.status(400) 
  //   throw new Error ("profile not found") 
  // }
  res.status(200).json(userprofile)
})
module.exports = {getUserProfile,updateUserProfile,addUserProfile}

