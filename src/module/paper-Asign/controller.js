// modules/paperAsign/controller.js

const { createPaperAsignService } = require("./services");


module.exports = {
  createPaperAsignController: async (req, res) => {
    try {
      const data = req.validatedData;

    const saved = await createPaperAsignService(data);

      return res.status(200).json({
        success: true,
        message: "Paper assigned successfully",
        data: saved
      });

    } catch (error) {
      console.log("PaperAsign Create Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
