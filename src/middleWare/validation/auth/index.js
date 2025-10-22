const User = require("../../../models/user.model");
const jwt = require('jsonwebtoken');


const verifyTokenAndAttachUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json(
      ( "Unauthorized: No token attached")
    );
  }

  let token = req.headers.authorization.split(" ")[1];
  
  

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json( "User not found");
    }
    console.log(user)

    req.userId = user?.id;
    req.user = user;
    next();
  } catch (error) {
     return res.status(400).json({
      success: false,
      message: "Invalid token ",
    });
  }
};

module.exports = {verifyTokenAndAttachUser};
