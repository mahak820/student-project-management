const expressAsyncHandler = require("express-async-handler")
const User = require("../Models/userModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const ProjectTopic = require("../Models/projectTopicModel")
const Review = require("../Models/reviewModel")
const Rank = require("../Models/rankModel")
const Project = require("../Models/projectModel")
// add a user
const addUser = expressAsyncHandler (async(req,res) => {
  const{name,email,password,phone} = req.body

  if(!name||!email||!phone||!password){
    res.status(400)
    throw new Error("please give all feilds")
  }
    // then check user already exist or not 
      // left side email save in my mongoDB
      const emailExist = await User.findOne({email : email})
      const phoneExist = await User.findOne({phone : phone})
  
      if(emailExist || phoneExist) {
          res.status(400)
          throw new Error("user already exist")
      }
  
      //  hash password
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(password,salt)
      // create new user
      const user = await User.create({
          name,email,password : hashedPassword,phone
      })
  
      if(!user){
      res.status(400)
      throw new Error("user not created !")
      }
      res.status(201).json({name : user.name,
          email : user.email,
          id: user._id,
          isAdmin : user.isAdmin,
                 token: generateToken(user._id)
      })
}
)


// get all users
const getAllUser = expressAsyncHandler(async (req,res) =>{
 const users = await User.find().select("-password")

 if(!users){
    res.status(400)
    throw new Error("users not found")
 }
 res.status(200).json(users)
})




// get a single user
const getUser = expressAsyncHandler( async (req,res) =>{

    const user = await User.findById(req.params._uid).select("-password")

    if(!user){
      res.status(400)
    throw new Error("user not found")    
    }
     res.status(200).json(user)
})

// get all projects
const getProjects = async(req,res) =>{
    const projects = await Project.find()
      if(!projects){
      res.status(400)
    throw new Error("projects not found")    
    }
     res.status(200).json(projects)
}

// get a single project
const getProject =expressAsyncHandler( async(req,res) =>{
  const project = await Project.findById(req.params._pid)
      if(!project){
      res.status(400)
    throw new Error("project not found")    
    }
     res.status(200).json(project)
}
)

// add project topic
const addProjectTopic = expressAsyncHandler(async (req,res) =>{

 const {topic,submission_date,last_date,details} = req.body

 if(!topic||!submission_date||!last_date||!details){
    res.status(400)
    throw new Error("please give all feild") 
 }

 const projectTopic = await ProjectTopic.create({topic,submission_date,last_date,details})

  if(!projectTopic){
      res.status(400)
    throw new Error("project topic is not created")  
  }
  res.status(200).json(projectTopic)
})

// get all project topic
const getAllProjectTopic = expressAsyncHandler(async(req,res) =>{

    const alltopics = await ProjectTopic.find()
     if(!alltopics){
      res.status(400)
    throw new Error("not found all the project topic")  
  }
  res.status(200).json(alltopics)

})

// delete project topic
const deleteProjectTopic = expressAsyncHandler( async(req,res)  =>{
const deleteTopic = await ProjectTopic.findByIdAndDelete(req.params._ptid)

if(!deleteTopic){
   res.status(400)
   throw new Error("topic not deleted")
}     
    
       res.status(200).json({id : deleteTopic._id,
        msg :"topic deleted"
       })
})



// update project topic
const updateProjectTopic = expressAsyncHandler(async(req,res)  =>{
    const updateTopic = await ProjectTopic.findByIdAndUpdate(req.params._ptid, req.body,{new: true})
       if (!updateTopic) {
    res.status(400)
    throw new Error(" not updated")
   }

   res.status(200).json(updateTopic)
})


// add a review
const addReview = expressAsyncHandler( async(req,res)  =>{
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


// add a rank
const addRank = expressAsyncHandler(async(req,res)  =>{
 const {position} = req.body

 if(!position){
 res.status(400)
    throw new Error("please give the position")    
 }

 const rank = await Rank.create({
user: req.user._id, // ✅ from protect middleware
    projectTopic: req.params._ptid,
    position
 })
 const populatedRank = await rank.populate([
         { path: "user", select: "name" },
         { path: "projectTopic", select: "topic" },
       ]);
   if(!rank){
   res.status(400)
    throw new Error(" review not found") 
  }

     res.status(201).json(populatedRank)
})


// delete user
const deleteUser = expressAsyncHandler(async(req,res)  =>{
   const deleteuser = await User.findByIdAndDelete(req.params._uid)
   if(!deleteuser){
   res.status(400)
   throw new Error("user not deleted")
}     
    
       res.status(200).json({id : deleteuser._id,
        msg :"user deleted"
       })
})

const getAllUserProfile = async(req,res)  =>{
    res.send("see the profile of all user")
}

const generateToken = (id) => {
    return jwt.sign({id : id } , process.env.JWT_secret , { expiresIn: "30d" });

}
module.exports = {getAllProjectTopic, updateProjectTopic,addProjectTopic,getAllUser,getUser,addUser,getProject,getProjects,addRank,addReview,getAllUserProfile,deleteProjectTopic,deleteUser}