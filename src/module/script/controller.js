const Manuscript = require("../../models/manuscript.model");
const { saveFile } = require("./service")

// const savefile = async (file) => {
//   if (!file) return null;
//   return {
//     name: file.name,
//     url: `/uploads/${file.filename}`,
//   };
// };

// const handleFiles = async (files) => {
//   if (!files) return [];
//   if (!Array.isArray(files)) files = [files];
//   return files.map((file) => ({
//     name: file.name,
//     url: `/uploads/${file.name}`,
//   }));
// };

const createScript = async (req, res) => {
  try {
    let {
      manuscriptDetails,
      authors,
      reviewers,
      conflictOfInterest,
      conflictDescription,
      dataAvailability,
    } = req.body;

    const { manuscript, figuresDetails, supplementaryDetails } =
      req.files || {};
      

    const manuScriptFileData = manuscript ? await saveFile(manuscript) : null;
    const figuresFilesData = await saveFile(figuresDetails);
    const supplementaryFilesData = await saveFile(supplementaryDetails);

    if (!manuScriptFileData) {
      return res.status(400).json({
        success: false,
        message: "Manuscript file is required",
      });
    }

    const manuscriptFiles = {
      manuscript: manuScriptFileData,
      figuresDetails: figuresFilesData || [],
      supplementaryDetails: supplementaryFilesData || [],
    };

    const newScript = await Manuscript.create({
      userId: req.userId,
      manuscriptDetails,
      authors,
      reviewers,
      conflictOfInterest,
      conflictDescription,
      dataAvailability,
      manuscriptFiles,
    });

    return res.status(201).json({
      success: true,
      message: "Manuscript uploaded successfully",
      data: newScript,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

module.exports = { createScript };
