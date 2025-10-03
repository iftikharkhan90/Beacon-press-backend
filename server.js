const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const mainRoutes = require("./src/api-routes/index");
const filePath = require("./src/middleWare/validation/script/file.handle");

const app = express();
const port = process.env.PORT;
const mongoURL = process.env.MONGO_URL;

app.use(express.json());
app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, 
  })
);
filePath(app);

mongoose
  .connect(mongoURL)
  .then(() => console.log("DB is Connected"))
  .catch((err) => console.log("Mongoose err" + err));
app.use("/api", mainRoutes);
app.listen(port, () => console.log("Server is running!!"));
