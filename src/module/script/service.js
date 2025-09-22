const { permanentFilePath } = require("../../middleWare/fileHandle");
const path = require("path");
const fs = require("fs");

const savefile = (file) => {
  return new Promise((resolve, reject) => {
    try {
      if (!file) {
        return reject({ success: false, message: "No file uploaded!" });
      }

      if (file.truncated) {
        return reject({ success: false, message: "File too large!" });
      }

      // Allowed file types
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
      ];
      if (!allowedTypes.includes(file.mimetype)) {
        return reject({ success: false, message: "Invalid file type!" });
      }

      const permanentPath = permanentFilePath();
      if (!fs.existsSync(permanentPath)) {
        fs.mkdirSync(permanentPath, { recursive: true });
      }

      const ext = path.extname(file.name).toLowerCase();
      const hashFile = file.md5;
      const newName = `${hashFile}-${Date.now()}${ext}`;
      const fileWay = path.join(permanentPath, newName);

      file.mv(fileWay, (err) => {
        if (err) {
          return reject({ success: false, message: "Error uploading file!" });
        }
        resolve({
          success: true,
          message: "File uploaded!",
          url: `${process.env.BASE_URL}/files/${newName}`,
          name: file.name,
          mimetype: file.mimetype,
          size: file.size,
        });
      });
    } catch (err) {
      console.log(err);
      reject({ success: false, message: err.message });
    }
  });
};

module.exports = { savefile };
