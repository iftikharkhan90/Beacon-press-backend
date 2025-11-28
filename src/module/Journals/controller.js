const Journal = require("../../models/Journals.model");
const services = require("./service");

module.exports = {
  createJournal: async (req, res) => {
    try {
      const journalData = req.validatedData || {};
      journalData.createdby = req.userId;

      const image = req.filePath?.image || "";
      if (image) journalData.image = image;

      const missingUsers = await services.validateUserIds(journalData.users);
      if (missingUsers.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Some users do not exist in the database.",
          missingUserIds: missingUsers,
        });
      }

      const newJournal = await Journal.create(journalData);
      return res.status(200).json({
        success: true,
        message: "journal created",
        journals: newJournal,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wron while creating journal. plese try later",
        error: error.message,
      });
    }
  },

  getJournals: async (req, res) => {
    try {
      const journals = await Journal.find()
        .populate("users")
        .populate("createdby");

      if (!journals || journals.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No journal(s) found" });
      }

      return res.status(200).json({
        success: true,
        message: `${journals.length} journal(s) retrieved successfully.`,
        journal: journals,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "An error occurred while fetching journals. Please try again later.",
        error: error.message,
      });
    }
  },

  updateJournal: async (req, res) => {
    try {
      const { journalId } = req.params;
      const journalData = req.validatedData || {};

      const image = req.filePath?.image || "";
      if (image) journalData.image = image;

      const missingUsers = await services.validateUserIds(journalData.users);
      if (missingUsers.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Some users do not exist in the database.",
          missingUserIds: missingUsers,
        });
      }

      const journal = await Journal.findByIdAndUpdate(journalId, journalData, {
        new: true,
      });
      if (!journal) {
        return res.status(400).json({
          success: false,
          message: "Journal not found. Please check the ID and try again.",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Journal updated successfully.",
        journal: journal,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "An error occurred while updating the journal. Please try again later.",
        error: error.message,
      });
    }
  },

  deleteJournalbyId: async (req, res) => {
    try {
      const { journalId } = req.params;

      const journal = await Journal.findByIdAndDelete(journalId);
      if (!journal) {
        return res.status(404).json({
          success: false,
          message: "Journal not found. Please check the ID and try again.",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Journal deleted successfully.",
        journal: journal,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "An error occurred while deleting the journal. Please try again later.",
        error: error.message,
      });
    }
  },
};
