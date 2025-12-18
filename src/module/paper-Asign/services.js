const PaperAsign = require("../../models/paper-asigns.model");

module.exports = {
  createPaperAsignService: async (data) => {
    return await PaperAsign.create(data);
  },

  // ✅ GET ALL ASSIGNMENTS FOR A JOURNAL
  getPaperAsignByJournalService: async (journalId) => {
    return await PaperAsign.find()
      .populate("manuscriptId")
      .populate({
        path: "journalUserId",
        populate: {
          path: "userId",
          select: "firstName lastName email",
        },
      });
  },
};
