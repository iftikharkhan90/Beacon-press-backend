const {
  createPaperAsignService,
  getPaperAsignByJournalService,
} = require("./services");

const Manuscript = require("../../models/manuscript.model");
const JournalUser = require("../../models/journal-users.model");
const PaperAsign = require("../../models/paper-asigns.model");

// CREATE
const createPaperAsignController = async (req, res) => {
  try {
    const { manuscriptId, journalUserId, status, feedBack } = req.body;

    if (!manuscriptId || !journalUserId) {
      return res.status(400).json({
        success: false,
        message: "manuscriptId and journalUserId are required",
      });
    }

    const manuscriptExists = await Manuscript.findById(manuscriptId);
    if (!manuscriptExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid manuscriptId",
      });
    }

    const journalUserExists = await JournalUser.findById(journalUserId);
    if (!journalUserExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid journalUserId",
      });
    }

    const saved = await createPaperAsignService({
      manuscriptId,
      journalUserId,
      status: status || "assigned",
      feedBack: feedBack || "",
    });

    return res.status(200).json({
      success: true,
      data: saved,
    });
  } catch (error) {
    console.error("Create PaperAsign Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// GET
const getPaperAsignByJournalController = async (req, res) => {
  try {
    const { journalId } = req.query;

    const data = await getPaperAsignByJournalService(journalId);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Get PaperAsign Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// UPDATE
const updatePaperAsignController = async (req, res) => {
  try {
    const updated = await PaperAsign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

// DELETE
const deletePaperAsignController = async (req, res) => {
  try {
    await PaperAsign.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

module.exports = {
  createPaperAsignController,
  getPaperAsignByJournalController,
  updatePaperAsignController,
  deletePaperAsignController,
};
