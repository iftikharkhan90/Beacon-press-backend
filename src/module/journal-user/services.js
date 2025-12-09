const JournalUser = require("../../models/journal-users.model");

const Role = require("../../models/role.model");
const Journals = require("../../models/Journals.model");
const User = require("../../models/user.model");
const { message } = require("../../middleWare/validation/script/schema");

module.exports = {
  validateJournalUserData: async ({ roleId, userId, journalId }) => {
    let role = null;
    let user = null;
    let journal = null;

    if (roleId) {
      role = await Role.findById(roleId);
      if (!role)
        return { valid: false, message: "Current Role ID is not correct" };
    }

    if (userId) {
      user = await User.findById(userId);
      if (!user)
        return { valid: false, message: "Current User ID is not correct" };
    }

    if (journalId) {
      journal = await Journals.findById(journalId);
      if (!journal)
        return { valid: false, message: "Current Journal ID is not correct" };
    }

    return { valid: true, role, user, journal };
  },

  getFilter: (userId, journalId) => {
    let filter = {};

    if (userId) {
      filter.userId = userId;
    }

    if (journalId) {
      filter.journalId = journalId;
    }

    if (Object.keys(filter).length === 0) {
      return {
        error: true,
        message: "Please provide either userId or journalId.",
      };
    }

    return filter;
  },
};
