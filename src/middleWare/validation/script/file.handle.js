const path = require("path");
const fs = require("fs");
const express = require("express");
const fileUpload = require("express-fileupload");

const filePath = (app) => {
  const permpath = path.join(__dirname, "../../../upload");

  // if (!fs.existsSync(permpath)) {
  //   fs.mkdirSync(permpath, { recursive: true });
  // }


  app.use("/files", express.static(permpath));


  app.use(
    fileUpload({
      useTempFiles: false,
      limits: { fileSize: 2 * 1024 * 1024 }, 
      abortOnLimit: true,
    })
  );
};

module.exports = filePath;





















// const path = require("path");
// const fs = require("fs");
// const express = require("express");
// const fileUpload = require("express-fileupload");

// const filePath = (app) => {
//   const permpath = path.join(__dirname, "../../../upload");

//   if (!fs.existsSync(permpath)) {
//     fs.mkdirSync(permpath, { recursive: true });
//   }


//   app.use("/files", express.static(permpath));


//   app.use(
//     fileUpload({
//       useTempFiles: false,
//       limits: { fileSize: 2 * 1024 * 1024 }, 
//       abortOnLimit: true,
//     })
//   );
// };

// module.exports = filePath;
