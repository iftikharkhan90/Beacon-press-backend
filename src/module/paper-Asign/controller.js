// modules/paperAsign/controller.js

const {
  createPaperAsignService,
  getPaperAsignByIdService,
} = require("./services");
const Manuscript = require("../../models/manuscript.model");
const JournalUser = require("../../models/journal-users.model");
const PaperAsign = require("../../models/paper-asigns.model");
const JournalUserRole = require("../../models/role.model");

module.exports = {
  createPaperAsignController: async (req, res) => {
    try {
      const data = req.validatedData;
      const manuscriptExists = await Manuscript.findById(data.manuscriptId);
      if (!manuscriptExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid manuscriptId: Manuscript not found",
        });
      }

      // 🟡 2. Check Journal User Exists
      const journalUserExists = await JournalUser.findById(data.journalUserId);
      if (!journalUserExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid journalUserId: Journal user not found",
        });
      }

      const saved = await createPaperAsignService(data);

      return res.status(200).json({
        success: true,
        message: "Paper assigned successfully",
        data: saved,
      });
    } catch (error) {
      console.log("PaperAsign Create Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  getPaperAsignByIdController: async (req, res) => {
    try {
      const journalUserId = req.query.journalUserId;
      console.log(journalUserId);

      const result = await getPaperAsignByIdService(journalUserId);

      if (!result || !result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Paper Assign not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.log("Get PaperAsign Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
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
          error: error.message,
        });
      }

      if (data.journalUserRoleId) {
        const jUser = await JournalUserRole.findById(data.journalUserRoleId);
        if (!jUser) {
          return res.status(400).json({
            success: false,
            message: "Invalid journalUserRoleId",
            error: error.message,
          });
        }
      }

      if (data.manuscriptId) {
        const manuscript = await Manuscript.findById(data.manuscriptId);
        if (!manuscript) {
          return res.status(400).json({
            success: false,
            message: "Invalid manuscriptId",
            error: error.message,
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

  // DELETE
  deletePaperAsignController: async (req, res) => {
    try {
      const id = req.params.id;

      const deleted = await PaperAsign.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "PaperAssign not found",
          error: error.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: "PaperAssign deleted successfully",
      });
    } catch (error) {
      console.log("PaperAsign Delete Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};
