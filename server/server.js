const express = require("express")
const cors = require('cors')
const connect_db = require("./config/db_config")
const colors = require("colors")
const errorHandler = require("./MiddleWare/errorHandler")
require("dotenv").config()
 const app = express()
 const port = process.env.PORT || 5000

 app.get("/",(req,res) =>{
    res.json ({mssg :  "hello server"})
 })
//  add middleware
app.use(express.json())
app.use(express.urlencoded({extended : true}))


// cros origin 
app.use(cors())

//  connect db
connect_db();

// admin routes
app.use("/api/admin",require("./routes/adminRoutes"))

// user profile 
app.use("/api/user_profile",require("./routes/userProfileRoutes"))

// project
app.use("/api/project",require("./routes/projectRoutes"))

// review
app.use("/api/review" ,require("./routes/reviewRoutes"))

// auth
app.use("/api/auth",require("./routes/authRoutes"))

// project topic
app.use("/api/projectTopic",require("./routes/projectTopic"))
app.use(errorHandler)

 app.listen(port,() =>{
    console.log(`server is running at ${port}`.bgYellow)
 })