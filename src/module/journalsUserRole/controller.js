const JournalsUserRole = require("../../models/journals.user.role.model");
const JUR = require("../../models/journals.user.role.model")
const Role = require("../../models/role.model")
const Journals = require("../../models/Journals.model")
const User = require("../../models/user.model");
const { message } = require("../../middleWare/validation/script/schema");

const createJournalUserRole = async (req, res) => {
  try {
    const { roleId, userId, journalsId, isAssigned } = req.validatedData;

    const retrieveRole = await Role.findById(roleId);
    if (!retrieveRole) {
      return res.status(404).json({ message: "Current Role ID is not correct" });
    }

    const retrieveUser = await User.findById(userId);
    if (!retrieveUser) {
      return res.status(404).json({ message: "Current User ID is not correct" });
    }

    const retrieveJournal = await Journals.findById(journalsId);
    if (!retrieveJournal) {
      return res.status(404).json({ message: "Current Journal ID is not correct" });
    }
    const existing = await JournalsUserRole.findOne({ roleId, userId, journalsId});
if (existing) {
  await JournalsUserRole.findByIdAndDelete(existing._id);
  return res.status(200).json({ message: "Role removed" });
}
    

    const JUR = await JournalsUserRole.create({ roleId, userId, journalsId, isAssigned });

    res.status(201).json({ success: true, data: JUR });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


const getJournalUserRole = async (req, res) => {
  try {
    const { userId, journalsId } = req.validatedData;

    let filter = {};

    if (userId) {
      filter.userId = userId;
    } else if (journalsId) {
      filter.journalsId = journalsId;
    }else {
      return res.status(400).json({
        message: "Please provide either userId or journalsId.",
      });
    }

    const retreveJUR = await JUR.find(filter)
      .populate("roleId")
      .populate("journalsId")
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


module.exports = {getJournalUserRole,createJournalUserRole}