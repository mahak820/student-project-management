const express = require("express")
const { addReview } = require("../controllers/adminControllers")
const protect = require("../MiddleWare/authMiddleware")
const { getReview } = require("../controllers/reviewController")
const router = express.Router()

router.post("/:_ptid",protect ,addReview)
router.get("/",protect,getReview)

module.exports = router