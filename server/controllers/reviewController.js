const expressAsyncHandler = require("express-async-handler")
const Review = require("../Models/reviewModel")
const Project = require("../Models/projectModel")

const addReview = expressAsyncHandler(async (req,res) =>{
  const {rating,comment , projectId} = req.body

   if(!rating||!comment){
    res.status(400)
     throw new Error(" fill all details") 
   }
   
   const project = await Project.findById(projectId)
   
   

   const review = await Review.create({
      
 user: req.user._id, // ✅ from protect middleware
     projectTopic: req.params._ptid,
     project : project._id ,
       rating,
       comment
   })
    const populatedReview = await review.populate([
          { path: "user", select: "name" },
          { path: "projectTopic", select: "topic" },
        ]);
    if(!review){
    res.status(400)
     throw new Error(" review not found") 
   }
 
      res.status(201).json(populatedReview)
})


const getReview = expressAsyncHandler (async(req,res) =>{
    const reviews = await Review.find().populate([
          { path: "user", select: "name" },
           { path: "project", select: "githubLink" },

          { path: "projectTopic", select: "topic" },
          
        ]);
         if(!reviews){
    res.status(400)
     throw new Error(" review not found") 
   }
 
      res.status(201).json(reviews)

})
module.exports = {addReview,getReview}