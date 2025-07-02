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
 const users = await User.find({isAdmin : false}).select("-password")

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

// get all projects of a user
const getUserAllProjects = async(req,res) =>{

  const userId = req.params.uid

    const projects = await Project.find({user : userId}).populate('projectTopic')
      if(!projects){
      res.status(400)
    throw new Error("projects not found")    
    }
     res.status(200).json(projects)
}

//GET USER'S ALL PORJECT NEW
// const getUserAllProjectsUpdated = expressAsyncHandler(async (req , res) => {
//   console.log("This function was called")
//   res.json({
//     msg : "HEllo world"
//   })
// } )

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
    
       res.status(200).json(deleteTopic)
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
  const {projectId , rank ,comment} = req.body

  const project = await Project.findByIdAndUpdate(projectId , {rank : rank , adminReview : comment} , {new : true}).populate('user' , 'name , email , _id').populate('projectTopic')
  
 
     res.status(201).json(project)
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


//GET ALL REVIEWS 
const getAllReviews = expressAsyncHandler(async(req,res) =>{

const reviews = await Review.find()
  .populate('user', 'name ,  email ,  _id')
  .populate({
    path: 'project',
    populate: {
      path: 'user', // change this to the field inside project you want to populate
      select: 'name , email' // optional, choose fields
    }
  })
  .populate('projectTopic');     if(!reviews){
      res.status(400)
    throw new Error("not found all the project topic")  
  }
  res.status(200).json(reviews)

})

const getAllUserProfile = async(req,res)  =>{
    res.send("see the profile of all user")
}

const generateToken = (id) => {
    return jwt.sign({id : id } , process.env.JWT_secret , { expiresIn: "30d" });

}

// add a rank
const addRank = expressAsyncHandler(async(req,res)  =>{
 const { position } = req.body;
  const projectId = req.params._pid;

  if (!position) {
    res.status(400);
    throw new Error("Please provide the position");
  }

  // 🔍 Step 1: Find the project from DB
  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  // 📌 Step 2: Extract projectTopic from project
  const projectTopicId = project.projectTopic;

  // ✅ Step 3: Create the rank entry
  const rank = await Rank.create({
    user: req.user._id,
    project: projectId,
    projectTopic: projectTopicId,
    position,
  });

  // ✅ Step 4: Populate for response
  const populatedRank = await rank.populate([
    { path: "user", select: "name" },
    { path: "project", select: "githubLink description" },
    { path: "projectTopic", select: "topic" },
  ]);

  res.status(201).json(populatedRank);
});

// get all projects submitted on a topic
const getSubmittedProjectsOnTopic = expressAsyncHandler(async(req,res) =>{

    const projects = await Project.find({projectTopic : req.params._ptid}).populate('projectTopic').populate('user')
     if(!projects){
      res.status(400)
    throw new Error("not found all the project topic")  
  }
  res.status(200).json(projects)

})

// get single project topic
const getSingleProjectTopic = expressAsyncHandler(async(req,res) =>{

    const projectTopic = await ProjectTopic.findById(req.params._ptid)
     if(!projectTopic){
      res.status(400)
    throw new Error("not found all the project topic")  
  }
  res.status(200).json(projectTopic)

})



module.exports = {getSingleProjectTopic , getUserAllProjects , getSubmittedProjectsOnTopic , getAllReviews , getAllProjectTopic, updateProjectTopic,addProjectTopic,getAllUser,getUser,addUser,getProject,getProjects,addRank,addReview,getAllUserProfile,deleteProjectTopic,deleteUser }


