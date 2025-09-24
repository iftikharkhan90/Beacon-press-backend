const path = require("path");
const fs = require("fs");
const express = require("express");
const fileUpload = require("express-fileupload");

const filePath = (app) => {
  const permpath = path.join(__dirname, "../../../upload");

  if (!fs.existsSync(permpath)) {
    fs.mkdirSync(permpath, { recursive: true });
  }

  // ✅ Serve uploaded files
  app.use("/files", express.static(permpath));

  // ✅ File upload middleware
  app.use(
    fileUpload({
      useTempFiles: false,
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
      abortOnLimit: true,
    })
  );
};

module.exports = filePath;
