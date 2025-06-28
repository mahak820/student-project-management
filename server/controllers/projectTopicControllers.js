const expressAsyncHandler = require("express-async-handler")

const ProjectTopic = require("../Models/projectTopicModel")


// get all projectTopics
const getAllProjectTopic = expressAsyncHandler(async(requestAnimationFrame,res) =>{
    const projectTopic = await ProjectTopic.find()
    if(!projectTopic) {
    res.status(400)
    throw new Error("project topic not found")
        }
    res.status(200).json(projectTopic)
})
module.exports = {getAllProjectTopic}