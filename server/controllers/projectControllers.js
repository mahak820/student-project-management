const expressAsyncHandler = require("express-async-handler")
const Project = require("../Models/projectModel")


// add project
const addProject = expressAsyncHandler(async (req,res) =>{
     const {description ,githubLink } = req.body
     if(!description||!githubLink){
        res.status(400)
        throw new Error("please fill all feild")
     }

     const project = await Project.create({
        user : req.user._id,
        isSubmit : true,
        projectTopic: req.params._ptid,
        description,githubLink
     })
     const populatedProject = await project.populate(
[
        { path: "user", select: "name" },
         { path: "projectTopic", select: "topic" },
]
     )
     if(!project){
              res.status(400)
        throw new Error("project not created")
     }
     res.status(200).json(populatedProject)
})


const deleteProject = expressAsyncHandler(async (req,res) =>{
   const deletePro = await Project.findByIdAndDelete(req.params._pid)
   if(!deletePro){
    res.status(400)
   throw new Error("project not deleted")
   }
   res.status(200).json({id :deletePro.id,
    message: "deleted"
   })
})
const getProject = expressAsyncHandler(async (req, res) => {


 try{
   const projects = await Project.find()
    .populate('user', 'name')
    .populate('projectTopic', 'topic')
     .populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'name',
      },
    });

  if (!projects || projects.length === 0) {
    res.status(404);
    throw new Error("No submitted projects found.");
  }

  res.status(200).json(projects);
 }catch (err) {
    console.error("Error in /api/project:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = {deleteProject,addProject,getProject}