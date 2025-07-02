const { mongoose } = require("mongoose");

const projectTopicSchema = new mongoose.Schema({
  topic:{
        type : String,
        required : true
    },
    submission_date :{
        type : String,
        required : true
    },details :{
 type : String,
        required : true
    },

    last_date:{
        type : String,
        required : true
    } ,
 
  
},
{
    timestamps : true
})

module.exports = mongoose.model("ProjectTopic", projectTopicSchema)