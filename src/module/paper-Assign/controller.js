const services = require("./services");

const PaperAssign = require("../../models/paper-asigns.model");
const mongoose = require("mongoose");
const paperAssign = require("../../middleWare/validation/paper-assign");

// CREATE

module.exports = {
  createPaperAssign: async (req, res) => {
    try {
      const { manuscriptId, journalUserId, status, feedBack } = req.body;

      if (!manuscriptId || !journalUserId) {
        return res.status(400).json({
          success: false,
          message: "manuscriptId and journalUserId are required",
        });
      }

      const result = await services.checkIdsToCreatePaperAssign({
        manuscriptId,
        journalUserId,
      });
      if (!result.valid) {
        return res.status(400).json({
          success: false,
          message: result.message,
        });
      }

      const paperAssign = await PaperAssign.create({
        manuscriptId,
        journalUserId,
        status: status || "assigned",
        feedBack: feedBack || "",
      });

      return res.status(200).json({
        success: true,
        data: paperAssign,
      });
    } catch (error) {
      console.error("Create PaperAsign Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },

  // GET
  getPaperAssigns: async (req, res) => {
    try {
      const paperAssign = await PaperAssign.find()
        .populate("manuscriptId")
        .populate({
          path: "journalUserId",
          populate: {
            path: "userId",
            select: "firstName lastName email",
          },
        });
      if (!paperAssign || paperAssign.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No data found",
          data: [],
        });
      }

      return res.status(200).json({
        success: true,
        data: paperAssign,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },

  // UPDATE
  updatePaperAssign: async (req, res) => {
    try {
      const data = req?.validatedData;
      const { id } = req.params;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid paper assign ID format or invalid ID",
        });
      }
      const result = await services.checkIdsToCreatePaperAssign(data);
      if (!result.valid) {
        return res.status(400).json({
          success: false,
          message: result.message,
        });
      }
      const updated = await PaperAssign.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!updated) {
        res.status(404).json({
          success: false,
          message: "ID is not found in paper assign",
        });
      }

      return res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error) {
     return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  // DELETE
  deletePaperAssign: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid paperAssign ID or format",
        });
      }
   const paperAssign =   await PaperAssign.findByIdAndDelete(id);
      if (!paperAssign) {
        res.status(404).json({
          success: false,
          message: "PaperAssign ID not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "PaperAssign deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};
