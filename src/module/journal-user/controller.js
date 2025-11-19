const JournalUser = require("../../models/journals.user.role.model");
const JUR = require("../../models/journals.user.role.model");
const Role = require("../../models/role.model");
const Journals = require("../../models/Journals.model");
const User = require("../../models/user.model");
const { message } = require("../../middleWare/validation/script/schema");

const createJournalUser = async (req, res) => {
  try {
    const { roleId, userId, journalId, isAssigned } = req.validatedData;

    const retrieveRole = await Role.findById(roleId);
    if (!retrieveRole) {
      return res
        .status(404)
        .json({ message: "Current Role ID is not correct" });
    }

    const retrieveUser = await User.findById(userId);
    if (!retrieveUser) {
      return res
        .status(404)
        .json({ message: "Current User ID is not correct" });
    }

    const retrieveJournal = await Journals.findById(journalId);
    if (!retrieveJournal) {
      return res
        .status(404)
        .json({ message: "Current Journal ID is not correct" });
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

    const JUR = await JournalUser.create({
      roleId,
      userId,
      journalId,
      isAssigned,
    });

    res.status(201).json({ success: true, data: JUR });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getJournalUser = async (req, res) => {
  try {
    const { userId, journalId } = req.validatedData;

    let filter = {};

    if (userId) {
      filter.userId = userId;
    } else if (journalId) {
      filter.journalId = journalId;
    } else {
      return res.status(400).json({
        message: "Please provide either userId or journalId.",
      });
    }

    const retreveJUR = await JournalUser.find(filter)
      .populate("roleId")
      .populate("journalId")
      .populate("userId");

    if (!retreveJUR) {
      console.log("JUR not found");
      return res.status(404).json({ message: "Journal User Role not found" });
    }

    console.log("JUR retrieved:", retreveJUR);
    return res.status(200).json(retreveJUR);
  } catch (err) {
    console.error("Error fetching JUR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.validatedData;

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required in params" });
    }

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ success: false, message: "No data to update" });
    }

    // ✅ Check if userId exists
    if (data.userId) {
      const userExists = await User.findById(data.userId);
      if (!userExists) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
    }

    // ✅ Check if journalId exists
    if (data.journalId) {
      const journalExists = await Journals.findById(data.journalId);
      if (!journalExists) {
        return res.status(404).json({ success: false, message: "Journal not found" });
      }
    }

    // ✅ Check if roleId exists
    if (data.roleId) {
      const roleExists = await Role.findById(data.roleId);
      if (!roleExists) {
        return res.status(404).json({ success: false, message: "Role not found" });
      }
    }

    const updatedDoc = await JournalUser.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ success: false, message: "JournalUser record not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Journal User Role updated successfully",
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
};




module.exports = { getJournalUser, createJournalUser, updateJournal };
