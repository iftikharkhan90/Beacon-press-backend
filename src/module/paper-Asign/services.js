// services/paperAsign.service.js

const PaperAsign = require("../../models/paper-asigns.model");

module.exports = {
  createPaperAsignService: async (data) => {
    try {
      const newAsign = new PaperAsign(data);
      return await newAsign.save();
    } catch (error) {
      throw error;
    }
  }
};
