
const { createPaperAsignService,getPaperAsignByIdService } = require("./services");
const Manuscript = require("../../models/manuscript.model")
const PaperAsign = require("../../models/paper-transition.model");
const JournalUserRole = require("../../models/role.model")
const userId = require("../../models/user.model")

module.exports = {
  createPaperAsignController: async (req, res) => {
    try {
      const data = req.validatedData;
      console.log("data",data);
      
       const manuscriptExists = await Manuscript.findById(data.paperId);
      if (!manuscriptExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid manuscriptId: Manuscript not found",
                  error:error.message

        });
      }

      const journalUserExists = await userId.findById(data.userId);
    console.log("jornausr",journalUserExists);
    
      if (!journalUserExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid userId: user not found",
                  error:error.message

        });
      }

    const saved = await createPaperAsignService(data);

      return res.status(200).json({
        success: true,
        message: "Paper assigned successfully",
        data: saved
      });

    } catch (error) {
      console.log("PaperAsign Create Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
                error:error.message

        
      });
    }
  },
  getPaperAsignByIdController: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getPaperAsignByIdService(id);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Paper Assign not found",

        });
      }

      return res.status(200).json({
        success: true,
        data: result
      });

    } catch (error) {
      console.log("Get PaperAsign Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
                error:error.message

        
      });
    }
  },
 updatePaperAsignController: async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.validatedData;

    const exists = await PaperAsign.findById(id);
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "PaperAssign not found",
      });
    }

    if (data.journalUserRoleId) {
      const jUser = await JournalUserRole.findById(data.journalUserRoleId);
      if (!jUser) {
        return res.status(400).json({
          success: false,
          message: "Invalid journalUserRoleId",
        });
      }
    }

    if (data.paperId) {
      const manuscript = await Manuscript.findById(data.paperId);
      if (!manuscript) {
        return res.status(400).json({
          success: false,
          message: "Invalid manuscriptId",
        });
      }
    }

    const updated = await PaperAsign.findByIdAndUpdate(id, data, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "PaperAssign updated successfully",
      data: updated,
    });

  } catch (error) {
    console.log("PaperAsign Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
},
  deletePaperAsignController: async (req, res) => {
    try {
      const id = req.params.id;

      const deleted = await PaperAsign.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "PaperAssign not found",
        error:error.message
        });
      }

      return res.status(200).json({
        success: true,
        message: "PaperAssign deleted successfully"
      });
    } catch (error) {
      console.log("PaperAsign Delete Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error:error.message
      });
    }
  }
};



