const express = require("express");
const protect = require("../MiddleWare/authMiddleware");
const { getAllStudentsWithDetails } = require("../controllers/studentController");
const router = express.Router()


router.get("/",protect,getAllStudentsWithDetails)

module.exports = router
