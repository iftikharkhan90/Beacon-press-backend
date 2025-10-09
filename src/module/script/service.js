const path = require("path");
const fs = require("fs");

const saveFile = async (file) => {
  if (!file) return null;
 //============================important===========
  // const permpath = path.join(__dirname, "../../upload");

  // if (!fs.existsSync(permpath)) {
  //   fs.mkdirSync(permpath, { recursive: true });
  // }
  //============================important===========



  const permpath = "alii"// is ko delete kerna hy
  const ext = path.extname(file.name).toLowerCase();
  const base = path.basename(file.name, ext); 
  const newName = `${base}-${Date.now()}${ext}`;
  const filePath = path.join(permpath, newName);

  // await file.mv(filePath);
  return {
    name: file.name,
    url: ` http://localhost:4000/files/${newName}`, 
  };
};

module.exports = { saveFile };
