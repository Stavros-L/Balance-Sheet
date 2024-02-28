const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; // Assuming JWT token is included in the Authorization header
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Fetch user document from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach user information to the request object
    req.user = {
      userId: user._id,
      username: user.username,
      salary: user.salary,
      monthlyBudget: user.monthlyBudget
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = isAuthenticated;
