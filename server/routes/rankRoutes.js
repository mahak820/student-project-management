const express = require("express")

const protect = require("../MiddleWare/authMiddleware")
const getRank = require("../controllers/rankControllers")
const router = express.Router()

router.get("/:_ptid" ,protect, getRank)

module.exports = router