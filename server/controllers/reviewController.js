const expressAsyncHandler = require("express-async-handler")

const addReview = expressAsyncHandler(async (req,res) =>{
  const {rating,comment} = req.body
 
   if(!rating||!comment){
    res.status(400)
     throw new Error(" fill all details") 
   }
   
   const review = await Review.create({
      
 user: req.user._id, // ✅ from protect middleware
     projectTopic: req.params._ptid,
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
module.exports = {addReview}