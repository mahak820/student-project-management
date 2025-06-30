const express = require("express")
const router = express.Router()
const { getAllUser, addUser, getUser, getProject, getProjects, addProjectTopic, deleteProjectTopic, updateProjectTopic, addReview, addRank, deleteUser, getAllUserProfile, getAllProjectTopic } = require("../controllers/adminControllers")
const adminProtect = require("../MiddleWare/adminMiddleware")

router.get("/users",adminProtect  ,getAllUser)
router.post("/user",adminProtect  ,addUser)
router.get("/user/:_uid",adminProtect  ,getUser)
router.get("/project/:_pid",adminProtect  ,getProject)
router.get("/projects",adminProtect  ,getProjects)
router.post("/project_topic",adminProtect  ,addProjectTopic)
router.delete("/project_topic/:_ptid",adminProtect  ,deleteProjectTopic)
router.put("/project_topic/:_ptid",adminProtect  ,updateProjectTopic)
router.post("/review/:_ptid",adminProtect  ,addReview)
router.post("/rank/:_pid",adminProtect  ,addRank)
router.delete("/user/:_uid",adminProtect  ,deleteUser)
router.get("/profiles",adminProtect  ,getAllUserProfile)
router.get("/project_topic",adminProtect,getAllProjectTopic)

module.exports = router

