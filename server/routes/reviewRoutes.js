const express = require("express")
const { addReview } = require("../controllers/adminControllers")
const protect = require("../MiddleWare/authMiddleware")
const router = express.Router()

router.post("/:_ptid",protect ,addReview)
module.exports = router