const userScript = require("../../models/manuscript.model");

// Upload new manuscript
const uploadManuscript = async (req, res) => {
  try {
    const {
      manuScriptDetail,
      authors,
      reviewersDetails,
      authorConflict,
      conflictDescription,
      dataAvailabilityStatement,
    } = req.body;

    // 1. VALIDATE REQUIRED FIELDS
    if (
      !manuScriptDetail ||
      !authors ||
      !reviewersDetails ||
      !dataAvailabilityStatement
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All required fields must be provided: manuScriptDetail, authors, reviewersDetails, dataAvailabilityStatement",
      });
    }

    // 2. VALIDATE FILE UPLOAD
    if (!req.files || !req.files.scriptFile) {
      return res.status(400).json({
        success: false,
        message: "Script file is required",
      });
    }

    // 3. PARSE JSON DATA WITH ERROR HANDLING
    let parsedManuScriptDetail, parsedAuthors, parsedReviewersDetails;

    try {
      parsedManuScriptDetail = JSON.parse(manuScriptDetail);
      parsedAuthors = JSON.parse(authors);
      parsedReviewersDetails = JSON.parse(reviewersDetails);
    } catch (parseError) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid JSON format in manuScriptDetail, authors, or reviewersDetails",
      });
    }

    // 4. VALIDATE ARRAY LENGTHS
    if (
      !Array.isArray(parsedManuScriptDetail) ||
      parsedManuScriptDetail.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "manuScriptDetail must be a non-empty array",
      });
    }

    if (!Array.isArray(parsedAuthors) || parsedAuthors.length < 1) {
      return res.status(400).json({
        success: false,
        message: "At least one author is required",
      });
    }

    if (
      !Array.isArray(parsedReviewersDetails) ||
      parsedReviewersDetails.length < 3
    ) {
      return res.status(400).json({
        success: false,
        message: "At least three reviewers are required",
      });
    }

    // 5. VALIDATE INDIVIDUAL OBJECT STRUCTURES
    try {
      // Validate manuScriptDetail structure
      parsedManuScriptDetail.forEach((detail) => {
        if (
          !detail.title ||
          !detail.type ||
          !detail.runningTitle ||
          !detail.subject ||
          !detail.abstract ||
          !detail.correspondingAuthor ||
          !detail.email
        ) {
          throw new Error("Invalid manuScriptDetail structure");
        }
      });

      // Validate authors structure
      parsedAuthors.forEach((author) => {
        if (
          !author.fullname ||
          !author.email ||
          !author.country ||
          !author.affiliation
        ) {
          throw new Error("Invalid author structure");
        }
      });

      // Validate reviewers structure
      parsedReviewersDetails.forEach((reviewer) => {
        if (
          !reviewer.fullname ||
          !reviewer.email ||
          !reviewer.country ||
          !reviewer.affiliation
        ) {
          throw new Error("Invalid reviewer structure");
        }
      });
    } catch (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError.message,
      });
    }

    // 6. HANDLE FILE UPLOADS
    const uploadPath = "uploads/";
    const scriptFile = req.files.scriptFile;
    const scriptPath = uploadPath + Date.now() + "_" + scriptFile.name;

    // Move main script file
    try {
      await scriptFile.mv(scriptPath);
    } catch (mvError) {
      return res.status(500).json({
        success: false,
        message: "Failed to save script file",
        error: mvError.message,
      });
    }

    // Handle optional figure/table files (could be single file or array)
    let figureTablePaths = [];
    if (req.files.figureTableFiles) {
      const figureFiles = Array.isArray(req.files.figureTableFiles)
        ? req.files.figureTableFiles
        : [req.files.figureTableFiles];

      for (const file of figureFiles) {
        const figurePath = uploadPath + Date.now() + "_" + file.name;
        try {
          await file.mv(figurePath);
          figureTablePaths.push({
            name: "Figure/Table File",
            url: figurePath,
          });
        } catch (mvError) {
          console.error("Failed to save figure file:", mvError.message);
          // Continue with other files even if one fails
        }
      }
    }

    // Handle optional supplementary files (could be single file or array)
    let supplementaryPaths = [];
    if (req.files.supplementaryFiles) {
      const suppFiles = Array.isArray(req.files.supplementaryFiles)
        ? req.files.supplementaryFiles
        : [req.files.supplementaryFiles];

      for (const file of suppFiles) {
        const suppPath = uploadPath + Date.now() + "_" + file.name;
        try {
          await file.mv(suppPath);
          supplementaryPaths.push({
            name: "Supplementary File",
            url: suppPath,
          });
        } catch (mvError) {
          console.error("Failed to save supplementary file:", mvError.message);
          // Continue with other files even if one fails
        }
      }
    }

    // 7. CREATE MANUSCRIPT DOCUMENT
    const newScript = await userScript.create({
      manuScriptDetail: parsedManuScriptDetail,
      authors: parsedAuthors,
      reviewersDetails: parsedReviewersDetails,
      authorConflict: authorConflict === "true" || authorConflict === true,
      conflictDescription: conflictDescription || "",
      dataAvailabilityStatement,
      manuScriptFiles: [
        {
          scriptFile: {
            name: "Script File",
            url: scriptPath,
          },
          figureTableFiles:
            figureTablePaths.length > 0 ? figureTablePaths : undefined,
          supplementaryFiles:
            supplementaryPaths.length > 0 ? supplementaryPaths : undefined,
        },
      ],
    });

    // 8. SUCCESS RESPONSE
    res.status(201).json({
      success: true,
      message: "Manuscript uploaded successfully",
      data: newScript,
    });
  } catch (err) {
    console.error("Upload manuscript error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = { uploadManuscript };
