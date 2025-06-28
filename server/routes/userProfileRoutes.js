const express = require("express")
const { addUserProfile, updateUserProfile, getUserProfile } = require("../controllers/userProfileController")
const protect = require("../MiddleWare/authMiddleware")
const router = express.Router()
 
router.post("/",protect,addUserProfile)
router.put("/",protect,updateUserProfile)
router.get("/",protect,getUserProfile)
module.exports = router