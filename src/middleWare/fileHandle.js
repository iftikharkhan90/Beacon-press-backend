const path = require("path");
const fs = require("fs");


const temporariyFilePath = () =>{
    const temFilePath = path.join(__dirname, "../tmp"); //For temprooray file path
if (!fs.existsSync(temFilePath)) {
  fs.mkdirSync(temFilePath);
}
return temFilePath
}


const permanentFilePath = () => {
  const Path = path.join(__dirname, "../upload");
  if (!fs.existsSync(Path)) {
    fs.mkdirSync(Path);
  }
  return Path; 
};


module.exports ={permanentFilePath,temporariyFilePath}

