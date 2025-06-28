const { default: mongoose } = require("mongoose");

const projectSchema = new mongoose.Schema({

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

    githubLink :{
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
       isSubmit :{
        type : Boolean,
        default : false
    }

})
module.exports = mongoose.model("Project",projectSchema)