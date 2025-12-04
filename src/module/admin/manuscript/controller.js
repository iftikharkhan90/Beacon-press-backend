const Manuscript = require('../../../models/manuscript.model');
const User = require("../../../models/user.model")
exports.getManuscriptsByAdminId = async (req, res) => {
    try{
    
        const manuscripts = await Manuscript
            .find()
    
        if (!manuscripts.length) {
            return res.status(500).json({ message: 'No manuscripts found for this admin' });
        }
    
        res.status(200).json({
            message: 'Manuscripts retrieved successfully',
            data: manuscripts
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch manuscripts', error: err.message });
    }
};