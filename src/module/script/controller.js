const Manuscript = require("../../models/manuscript.model");

const savefile = async (file) => {
  if (!file) return null;
  return {
    name: file.originalname,
    url: `/uploads/${file.filename}`,
  };
};

const handleFiles = async (files) => {
  if (!files) return [];
  if (!Array.isArray(files)) files = [files];
  return files.map((file) => ({
    name: file.originalname,
    url: `/uploads/${file.filename}`,
  }));
};

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

    const manuscriptFileData = manuscript ? await savefile(manuscript) : null;
    const figuresFilesData = await handleFiles(figuresDetails);
    const supplementaryFilesData = await handleFiles(supplementaryDetails);

    if (!manuscriptFileData) {
      return res.status(400).json({
        success: false,
        message: "Manuscript file is required",
      });
    }

    const manuscriptFiles = {
      manuscript: manuscriptFileData,
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
      message: "Server error: " + err.message,
    });
  }
};

module.exports = { createScript };
