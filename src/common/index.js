const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();




//For genrate jwt token
const generateToken = (user) => {
  const payload = {
    id: user._id,
  };
  const secretKey = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h",
  };
  const token = jwt.sign(payload, secretKey, options);
  return token;
};

//For compare token
const verfyToken= (token) => {
  try {
    const secretkey = process.env.JWT_SECRET;
    const decode = jwt.verify(token, secretkey);
    return {
      success: true,
      data: decode,
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err.message,
    };
  }
};

module.exports= { generateToken,verfyToken };
