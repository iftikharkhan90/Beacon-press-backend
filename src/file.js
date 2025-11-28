const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");

const uploadDir = path.join(__dirname, "./upload");

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Allowed file types
const allowedTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
  "image/tiff",
  "image/avif",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

// Middleware
const uploadMiddleware = fileUpload({
  limits: { fileSize: 80 * 1024 * 1024 }, // 80 MB
  abortOnLimit: true,
  useTempFiles: false,
  preserveExtension: true,
});

// Function to handle single file dynamically
const handleSingleFile = (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Get first uploaded file dynamically
    const fileKey = Object.keys(req.files)[0];
    const file = req.files[fileKey];

    // Validate file type
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ success: false, message: "Invalid file type" });
    }

    const fileName = Date.now() + "-" + file.name;
    const finalPath = path.join(uploadDir, fileName);

    file.mv(finalPath, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "File upload failed", error: err.message });
      }

      // Send uploaded file path and field name
      req.filePath = { [fileKey]: `http://localhost:4000/files/${fileName}` };
      const path = req.filePath
      console.log(path);
      
      next();
    });
  } catch (err) {
    if (err.message.includes("File too large")) {
      return res.status(413).json({ success: false, message: "File size exceeds 80 MB limit" });
    }
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Function to handle multiple files dynamically
const handleMultipleFiles = (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    let uploadedFiles = {};

    // Loop through all file fields dynamically
    for (let key of Object.keys(req.files)) {
      const files = Array.isArray(req.files[key]) ? req.files[key] : [req.files[key]];

      // uploadedFiles[key] = [];

      for (let file of files) {
        // Validate type
        if (!allowedTypes.includes(file.mimetype)) {
          return res.status(400).json({ success: false, message: `Invalid file type: ${file.name}` });
        }

        // Validate size
        if (file.size > 80 * 1024 * 1024) {
          return res.status(413).json({ success: false, message: `File too large: ${file.name}` });
        }

        const fileName = Date.now() + "-" + file.name;
        const finalPath = path.join(uploadDir, fileName);

        // Move file to upload folder
        file.mv(finalPath, (err) => {
          if (err) {
            return res.status(500).json({ success: false, message: `Failed to upload ${file.name}`, error: err.message });
          }
        });

        // Save file URL in the array for this field
        uploadedFiles[key]=`http://localhost:4000/files/${fileName}`;
      }
    }

    req.filePaths = uploadedFiles;
    console.log(req.filePaths);

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};


module.exports = { uploadMiddleware, handleSingleFile, handleMultipleFiles };
