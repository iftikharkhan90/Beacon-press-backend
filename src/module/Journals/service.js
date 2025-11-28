const User = require("../../models/user.model");

module.exports = {

  validateUserIds: async (userIds) => {
    if (!Array.isArray(userIds) || userIds.length === 0) return [];

    // Find all users whose _id is in the list
    const existingUsers = await User.find({
      _id: { $in: userIds },
    }).select("_id");

    // Convert IDs to strings for comparison
    const existingIds = existingUsers.map((u) => u._id.toString());

    // Find which IDs are missing
    const missing = userIds.filter((id) => !existingIds.includes(id));

    return missing; // return missing IDs
  },
  
};
