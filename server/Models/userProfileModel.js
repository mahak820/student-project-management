const { default: mongoose } = require("mongoose");

const userProfileShema = new mongoose.Schema({

    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref :"User",
        required : true
    },
    github :{
        type : String,
        default : ""
    },
     linkedin :{
        type : String,
        default : ""
    },
     year :{
        type : String,
        default : ""
    },
     collage :{
        type : String,
        default : ""
    },
    course :{
     type : String,
        default : ""
    },
    experience :{
            type : String,
       default : ""
    },
    isComplete :{
        type : Boolean,
         default : false,
    }
})
module.exports = mongoose.model("UserPofile",userProfileShema)