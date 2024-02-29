const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const isAuthenticated = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    // Split the Authorization header and retrieve the token
    const token = req.headers.authorization.split(" ")[1]; 

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId to request object for further middleware/routes
    req.user = { userId: decodedToken.userId };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = isAuthenticated;
