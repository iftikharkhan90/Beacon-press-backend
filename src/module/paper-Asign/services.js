// services/paperAsign.service.js

const PaperAsign = require("../../models/paper-asigns.model");
const mongoose = require("mongoose");

module.exports = {
  createPaperAsignService: async (data) => {
    try {
      const newAsign = new PaperAsign(data);
      return await newAsign.save();
    } catch (error) {
      throw error;
    }
  },
  getPaperAsignByIdService: async (journalUserId) => {
    return await PaperAsign.find({ journalUserId })
      .populate("manuscriptId")
      .populate("journalUserId");
  },
};
