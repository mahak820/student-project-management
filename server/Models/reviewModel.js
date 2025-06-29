const { default: mongoose } = require("mongoose");
const reviewSchema = new mongoose.Schema({
     user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required :true
    },
    projectTopic: {
   type: mongoose.Schema.Types.ObjectId,
   required: true,
   ref: "ProjectTopic" // ya Student/Assignment/etc.
 },
  project: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Project" // ya Student/Assignment/etc.
 },
  
 rating: {
      type: Number,
      required: true,
    
    },
    comment:{
        type : String,
        required : true
    } ,
   
},
{
    timestamps : true
})
module.exports = mongoose.model("Review",reviewSchema)