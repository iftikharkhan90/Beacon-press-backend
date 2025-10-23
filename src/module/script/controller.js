const Manuscript = require("../../models/manuscript.model");
const { saveFile } = require("./service")

const createScript = async (req, res) => {
  try {
    let {
      journalsId,
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
      journalsId,
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



const getScript = async (req, res) => {
  try {
    const user = req.user; 

    const script = await Manuscript.find({ userId: user._id })  
      .populate("userId").populate("journalsId");  

    if (!script) {
      return res.status(400).json({ success: false, message: "No script exists for this user" });
    }

    return res.status(200).json(
      { success: true, manuscript: script }
    );
  } catch (err) {
    console.error("Error:", err);
    return res.status(400).json(
      { 
      success: false, error: err.message 
    });
  }
};


module.exports = { createScript,getScript };
