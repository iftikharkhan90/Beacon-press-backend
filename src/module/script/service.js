const path = require("path");
const fs = require("fs");

// const savewwfile = (file) => {
//   return new Promise((resolve, reject) => {
//     try {
//       if (!file) {
//         return reject({ success: false, message: "No file uploaded!" });
//       }

//       if (file.truncated) {
//         return reject({ success: false, message: "File too large!" });
//       }

//       // Allowed file types
//       const allowedTypes = [
//         "application/pdf",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
//       ];
//       if (!allowedTypes.includes(file.mimetype)) {
//         return reject({ success: false, message: "Invalid file type!" });
//       }

//   const permpath = path.join(__dirname, "../../upload");

//   if (!fs.existsSync(permpath)) {
//     fs.mkdirSync(permpath, { recursive: true });
//   }

//       const ext = path.extname(file.name).toLowerCase();
//       const newName = `${file.name}-${Date.now()}${ext}`;
//       const fileWay = path.join(permpath, newName);

//       file.mv(fileWay, (err) => {
//         if (err) {
//           return reject({ success: false, message: "Error uploading file!" });
//         }
//         resolve({
//           success: true,
//           message: "File uploaded!",
//           url: `${process.env.BASE_URL}/files/${newName}`,
//           name: file.name,
//           mimetype: file.mimetype,
//           size: file.size,
//         });
//       });
//     } catch (err) {
//       console.log(err);
//       reject({ success: false, message: err.message });
//     }
//   });
// };
// //////////////////////

const saveFile = async (file) => {
  if (!file) return null;

  const permpath = path.join(__dirname, "../../upload");

  if (!fs.existsSync(permpath)) {
    fs.mkdirSync(permpath, { recursive: true });
  }


  const ext = path.extname(file.name).toLowerCase();
  const base = path.basename(file.name, ext); 
  const newName = `${base}-${Date.now()}${ext}`;
  const filePath = path.join(permpath, newName);

  await file.mv(filePath);
  return {
    name: file.name,
    url: ` http://localhost:4000/files/${newName}`, 
  };
};

module.exports = { saveFile };
