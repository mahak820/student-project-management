const { default: mongoose } = require("mongoose");

const userProfileShema = new mongoose.Schema({

    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref :"User",
        required : true
    },
    github :{
        type : String,
        required : true
    },
     linkedin :{
        type : String,
        required : true
    },
     year :{
        type : String,
        required : true
    },
     collage :{
        type : String,
        required : true
    },
    course :{
     type : String,
        required : true
    },
    experience :{
            type : String,
        required : true 
    },
    isComplete :{
        type : Boolean,
         default : false,
         required : true
    }
})
module.exports = mongoose.model("UserPofile",userProfileShema)