const  express = require("express")
const mongoose = require("mongoose")
const cors = require ("cors")
require("dotenv").config()
const mainRoutes = require("./src/api-routes/index")
const fileUpload = require("express-fileupload");


const app = express()
const port = process.env.PORT
const mongoURL = process.env.MONGO_URL 
const Api = process.env.API

app.use(express.json())
app.use(  
  cors({
    origin: "*", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true, // if you use cookies/auth
  })
);

mongoose.connect(mongoURL).then(()=>console.log("DB is Connected")).catch((err) => console.log("Mongoose err"+err))
app.use("/beconsApi",mainRoutes)
app.listen(port,()=>console.log("Server is running!!"))

