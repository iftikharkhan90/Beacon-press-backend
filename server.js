const  express = require("express")
const mongoose = require("mongoose")
const cors = require ("cors")
require("dotenv").config()
const mainRoutes = require("./src/api-routes/index")
const fileUpload = require("express-fileupload");
const {permanentFilePath,temporariyFilePath} = require("./src/middleWare/fileHandle")


const app = express()
const port = process.env.PORT
console.log("port",port)
const mongoURL = process.env.MONGO_URL 
const Api = process.env.API
const tempath = temporariyFilePath()

app.use(express.json())
app.use(  
  cors({
    origin: "*", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true, // if you use cookies/auth
  })
);
app.use("/files", express.static(permanentFilePath()));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: tempath,
    limits: { fileSize: 2 * 1024 * 1024 },
    abortOnLimit: true,
  })
);

mongoose.connect(mongoURL).then(()=>console.log("DB is Connected")).catch((err) => console.log("Mongoose err"+err))
app.use("/api",mainRoutes)
app.listen(port,()=>console.log("Server is running!!"))

