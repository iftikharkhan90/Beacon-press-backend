// services/paperAsign.service.js

const PaperAsign = require("../../models/paper-transition.model");

module.exports = {
  createPaperAsignService: async (data) => {
    try {
      const newAsign = new PaperAsign(data);
      return await newAsign.save();
    } catch (error) {
      throw error;
    }
  },
   getPaperAsignByIdService: async (id) => {
    return await PaperAsign.findById(id)
      .populate("paperId")
      .populate("userId");
      
  }
};
