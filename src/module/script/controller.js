const userScript = require("../../models/manuscript.model");
require("dotenv").config();
const { savefile } = require("./service");

// Upload new manuscript
const createScript = async (req, res) => {
  try {
    // extract text fields
    let manuScriptDetail = req.body.manuScriptDetail;
    let authors = req.body.authors;
    let reviewersDetails = req.body.reviewersDetails;

    const { authorConflict, conflictDescription, dataAvailabilityStatement } =
      req.body;

    // extract files
    const { scriptFile, figureTableFiles, supplementaryFiles } =
      req.files || {};

    // 🔹 Validation
    if (!manuScriptDetail) {
      return res
        .status(400)
        .json({ message: "Please provide manuscriptDetail" });
    }

    if (!authors || authors.length < 1) {
      return res
        .status(400)
        .json({ message: "At least 1 author must be provided" });
    }

    if (!reviewersDetails || reviewersDetails.length < 3) {
      return res
        .status(400)
        .json({ message: "At least 3 reviewers must be provided" });
    }

    if (authorConflict && !conflictDescription) {
      return res
        .status(400)
        .json({ message: "Please provide author conflict detail" });
    }

    if (!dataAvailabilityStatement) {
      return res
        .status(400)
        .json({ message: "Please provide data availability statement" });
    }

    try {
      manuScriptDetail = JSON.parse(manuScriptDetail);
      authors = JSON.parse(authors);
      reviewersDetails = JSON.parse(reviewersDetails);
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid JSON" });
    }

    //     manuScriptDetail = JSON.parse(manuScriptDetail);
    // authors = JSON.parse(authors);
    // reviewersDetails = JSON.parse(reviewersDetails);
    //    try {
    //   manuScriptDetail = JSON.parse(manuScriptDetail)

    //   authors =JSON.parse(authors)

    //   reviewersDetails = JSON.parse(reviewersDetails)

    // } catch (e) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid JSON in manuscript data",
    //   });
    // }

    if (!scriptFile) {
      return res.status(400).json({ message: "Manuscript file is required" });
    }

    // 🔹 Save files using your savefile util
    const scriptFileData = await savefile(scriptFile).catch((err) => err);
    if (!scriptFileData.success) return res.status(400).json(scriptFileData);

    const figureTableFilesData = figureTableFiles
      ? await savefile(figureTableFiles).catch((err) => err)
      : null;

    const supplementaryFilesData = supplementaryFiles
      ? await savefile(supplementaryFiles).catch((err) => err)
      : null;

    // 🔹 Save to DB
    const newScript = new userScript({
      userId: "68b8353e30f15c623e7c1cee", // ✅ comes from auth middleware (e.g. JWT decoded user)
      manuScriptDetail,
      authors,
      reviewersDetails,
      authorConflict,
      conflictDescription,
      dataAvailabilityStatement,
      manuScriptFiles: {
        scriptFile: { url: scriptFileData.url }, // default name already in schema
        figureTableFiles: figureTableFilesData
          ? { url: figureTableFilesData.url }
          : {},
        supplementaryFiles: supplementaryFilesData
          ? { url: supplementaryFilesData.url }
          : {},
      },
    });

    await newScript.save();

    return res.status(201).json({
      success: true,
      message: "Manuscript uploaded successfully",
      data: newScript,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error: " + err.message,
    });
  }
};

module.exports = { createScript };
