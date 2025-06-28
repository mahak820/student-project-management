const { default: mongoose } = require("mongoose");

const rankSchena = new mongoose.Schema({

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
 position :{
    type : String,
    required : true
 }

},{
    timestamps : true
})

module.exports =  mongoose.model("Rank" ,rankSchena)