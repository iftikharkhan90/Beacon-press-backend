const { permanentFilePath } = require("../../middleWare/fileHandle");
const path = require("path");
const fs = require("fs");

const savefile = (file) => {
  return new Promise((resolve, reject) => {
    const permanentPath = permanentFilePath();

    if (!file) {
      return reject({ success: false, message: "No file uploaded!" });
    }

    if (file.truncated) {
      return reject({ success: false, message: "File too large!" });
    }

    if (file.mimetype !== "application/pdf") {
      return reject({ success: false, message: "Only PDF allowed!" });
    }

    const ext = path.extname(file.name).toLowerCase();
    const hashFile = file.md5;
    const newName = `${hashFile}${ext}`;
    const fileWay = path.join(permanentPath, newName);
    file.mv(fileWay, (err) => {
      if (err) {
        return reject({ success: false, message: "Error uploading file!" });
      }
      resolve({
        success: true,
        message: "File uploaded!",
        url: `${process.env.BASE_URL}/files/${newName}`,
      });
    });
  });
};

module.exports = { savefile };
