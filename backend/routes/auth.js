const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const isAuthenticated = require("../middleware/authMiddleware");

// User Registration
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    // Send token and username in response
    res.status(200).json({ user: user.username , token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User Logout
router.post("/logout", (req, res) => {
  // to do later
  res.status(200).json({ message: "Logout successful" });
});


// Those are to change the user's profile information

// Change Password
router.put("/change-password", isAuthenticated, async (req, res) => {
  try {
    const { newPassword } = req.body;
    const userId = req.user.userId;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in the database
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update Salary
router.put("/update-salary", isAuthenticated, async (req, res) => {
  try {
    const { newSalary } = req.body;
    const userId = req.user.userId;

    // Update user's salary in the database
    await User.findByIdAndUpdate(userId, { salary: newSalary });

    res.status(200).json({ message: "Salary updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update Monthly Budget
router.put("/update-monthly-budget", isAuthenticated, async (req, res) => {
  try {
    const { newMonthlyBudget } = req.body;
    const userId = req.user.userId;

    // Update user's monthly budget in the database
    await User.findByIdAndUpdate(userId, { monthlyBudget: newMonthlyBudget });

    res.status(200).json({ message: "Monthly budget updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
