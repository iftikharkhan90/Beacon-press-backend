const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const mainRoutes = require("./src/api-routes");
const filePath = require("./src/middleWare/validation/script/file.handle");
const seedRole = require("./seeder/role.seeder");

const app = express();

/* =======================
   ENV SAFETY
======================= */
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error("❌ MONGO_URL is missing in .env");
  process.exit(1);
}

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

/* =======================
   FILE HANDLING
======================= */
filePath(app);
app.use("/files", express.static(path.join(__dirname, "src", "upload")));

/* =======================
   ROUTES
======================= */
app.use("/api", mainRoutes);

/* =======================
   DATABASE + SERVER
======================= */
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");

    // ⚠️ Seed roles ONLY ONCE
    seedRole();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
