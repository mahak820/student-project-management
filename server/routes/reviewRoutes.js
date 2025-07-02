const express = require("express")
const protect = require("../MiddleWare/authMiddleware")
const { getReview, addReview } = require("../controllers/reviewController")
const router = express.Router()

router.post("/:_ptid",protect ,addReview)
router.get("/",protect,getReview)

module.exports = router