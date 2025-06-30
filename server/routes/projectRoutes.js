const express = require("express");
const { addProject, deleteProject, getProject, getUserProject } = require("../controllers/projectControllers");
const protect = require("../MiddleWare/authMiddleware");
const router = express.Router()

router.post("/:_ptid",protect,addProject)
router.delete("/:_pid" ,protect ,deleteProject)
router.get("/",protect,getProject)
router.get("/:_uid",protect,getUserProject)

module.exports = router
