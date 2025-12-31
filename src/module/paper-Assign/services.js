const PaperAssign = require("../../models/paper-asigns.model");
const Manuscript = require("../../models/manuscript.model");
const JournalUser = require("../../models/journal-users.model");

module.exports = {
  checkIdsToCreatePaperAssign: async ({ manuscriptId, journalUserId }) => {
    if (manuscriptId) {
      const manuscript = await Manuscript.findById(manuscriptId);
      if (!manuscript)
        return {
          valid: false,
          message: "Current manuscript ID is not correct",
        };
    }

    if (journalUserId) {
      const journalUser = await JournalUser.findById(journalUserId);
      if (!journalUser)
        return {
          valid: false,
          message: "Current journalUser ID is not correct",
        };
    }

    return { valid: true };
  },
};
