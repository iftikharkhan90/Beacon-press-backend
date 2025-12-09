const JournalUser = require("../../models/journal-users.model");
const Role = require("../../models/role.model");
const Journals = require("../../models/Journals.model");
const User = require("../../models/user.model");
const services = require("./services");

module.exports = {
  createJournalUser: async (req, res) => {
    try {
      const { roleId, userId, journalId, isAssigned } = req.validatedData;

      const result = await services.validateJournalUserData({
        roleId,
        userId,
        journalId,
      });
      if (!result.valid) {
        return res.status(400).json({
          success: false,
          message: result.message,
        });
      }

      const existing = await JournalUser.findOne({
        roleId,
        userId,
        journalId,
      });

      if (existing) {
        await JournalUser.findByIdAndDelete(existing._id);
        return res.status(200).json({ message: "Role removed" });
      }

      const journalUser = await JournalUser.create({
        roleId,
        userId,
        journalId,
        isAssigned,
      });

      res.status(201).json({ success: true, data: journalUser });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  getJournalUser: async (req, res) => {
    try {
      const { userId, journalId } = req.query;

      const filter = services.getFilter(userId, journalId);


      if (filter.error) {
        return res.status(400).json(filter);
      }

      const retreveJournalUser = await JournalUser.find(filter)
        .populate("roleId")
        .populate("journalId")
        .populate("userId");

      if (!retreveJournalUser || retreveJournalUser.length === 0) {
        return res.status(404).json({ message: "Journal User Role not found" });
      }

      return res.status(200).json({
        success: true,
        data: retreveJournalUser,
      });
    } catch (error) {
      console.error("Error fetching JUR:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server error!",
        error: error.message,
      });
    }
  },

  updateJournal: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.validatedData;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID is required in params",
        });
      }
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
          success: false,
          message: "No data to update",
        });
      }

      const validation = await services.validateJournalUserData(data);

      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          message: validation.message,
        });
      }

      const updatedDoc = await JournalUser.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!updatedDoc) {
        return res.status(404).json({
          success: false,
          message: "Journal-User record not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Journal-User updated successfully",
        data: updatedDoc,
      });
    } catch (error) {
      console.error("Error updating JournalUserRole:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};
