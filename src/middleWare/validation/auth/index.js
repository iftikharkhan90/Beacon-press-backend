const User = require("../../../models/user.model");
const jwt = require('jsonwebtoken');
const verifyTokenAndAttachUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(
      ("UNAUTHORIZED", "Unauthorized: No token attached")
    );
  }

  let token = req.headers.authorization.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(req.user.id);
    if (!user) {
      return next("Failed", "User not found");
    }

    req.userId = user?.id;
    console.log("  req.userId", req.userId);
    req.user = user;

    next();
  } catch (error) {
    console.log("Error:", error);
    return next("Unauthorizeed", "Invalid token");
  }
};

module.exports = {
  verifyTokenAndAttachUser,
};
