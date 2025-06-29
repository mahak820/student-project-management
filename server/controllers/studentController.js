// controllers/adminController.js

// import Student from '../Models/studentModel.js';
const Student = require("../Models/studentModel.js")
const Project = require('../Models/projectModel.js');
const Review = require('../Models/reviewModel.js');
const ProjectTopic = require('../Models/projectTopicModel.js');

const getAllStudentsWithDetails = async (req, res) => {
  try {
    // Step 1: Get all project topics
    const topics = await ProjectTopic.find();
  console.log(topics)
    const result = [];

    for (const topic of topics) {
      // Step 2: Get all projects for this topic
      const projects = await Project.find({  projectTopic : topic._id })
        .populate('user', 'name')
        .populate('projectTopic', 'topic');
          console.log("Topic:", topic.topic);
  console.log(projects)




      // Step 3: For each project, get reviews
      const projectsWithReviews = await Promise.all(
        projects.map(async (project) => {
          const reviews = await Review.find({ project: project._id });
          return {
            studentName: project.user.name,
            projectTopic: project.projectTopic.topic,
            link: project.githubLink,
            description: project.description,
            reviews: reviews.map((r) => ({
              rating: r.rating,
              comment: r.comment,
            })),
          };
        })
      );
      console.log(projectsWithReviews)

      result.push({
        topic: topic.topic,
        projects: projectsWithReviews,
      });
    }
   console.log(result)
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getAllStudentsWithDetails:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports =  {getAllStudentsWithDetails}
