const express = require("express")
const { getAllProjectTopic } = require("../controllers/projectTopicControllers")
const protect = require("../MiddleWare/authMiddleware")
const router = express.Router()

router.get("/" ,protect,  getAllProjectTopic)

module.exports = router