const { default: mongoose } = require("mongoose");

const studentSchema = new mongoose.Schema({
     name :{
        type :String
     },
    user :{
  type: mongoose.Schema.Types.ObjectId,
  ref : 'User',
  required : true
    },
      projectTopic :{
  type: mongoose.Schema.Types.ObjectId,
  ref : 'ProjectTopic',
  required : true
    },
    reviews: { type: mongoose.Schema.Types.ObjectId,
       ref: "Review" },

       project : {
         type: mongoose.Schema.Types.ObjectId,
       ref: "Project"
       },


})
module.exports = mongoose.model("Student",studentSchema)