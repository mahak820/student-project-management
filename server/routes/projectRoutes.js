const express = require("express");
const { addProject, deleteProject, getProject } = require("../controllers/projectControllers");
const protect = require("../MiddleWare/authMiddleware");
const router = express.Router()

router.post("/:_ptid",protect,addProject)
router.delete("/:_pid" ,protect ,deleteProject)
router.get("/",protect,getProject)

module.exports = router
