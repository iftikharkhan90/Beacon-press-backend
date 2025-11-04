const { message } = require("../../middleWare/validation/script/schema");
const Journal = require("../../models/Journals.model");
const User = require("../../models/user.model");
const {saveFile} =  require("../script/service")

const createJournals = async (req, res) => {
  try {
    const data = req.validatedData;
    data.createdby=req.user     
    const {image} = req.files || {}

    if (image) {
  const { url } = await saveFile(image);
  if (url) data.image = url;
}




    const newJournals = await Journal.create(data);
    return res.status(200).json({
      success: true,
      message: "journal created",
      journals: newJournals,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getJournals = async (req, res) => {
  try {
    const journal = await Journal.find().populate("users").populate("createdby");;
    
if (!journal || journal.length === 0) {
  return res
    .status(404)
    .json({ success: false, message: "No journal(s) found" });
}

    return res.status(200).json({
      success: true,
      message: "Journal found",
      journal: journal,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const patchJournals = async (req, res) => {
  try {
    const { journalId } = req.params;
    const data = req.validatedData;

    const {image} = req.files || {}
       if (image) {
  const { url } = await saveFile(image);
  if (url) data.image = url;
}



    const journal = await Journal.findByIdAndUpdate(journalId, data,
    {
      new: true,
    });
    if (!journal) {
      return res.status(400).json({
        success: false,
        message: "id not match",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Update successfully",
      journal: journal,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteJournals = async (req, res) => {
  try {
    const { journalId } = req.params;
    const journal = await Journal.findByIdAndDelete(journalId);
    if (!journal) {
      return res.status(400).json({
        success: false,
        message: "id not match",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Delete successfully",
      journal: journal,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { createJournals, getJournals , patchJournals, deleteJournals};
