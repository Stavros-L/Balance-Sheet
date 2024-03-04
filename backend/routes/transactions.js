const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/authMiddleware");
const Transaction = require("../models/TransactionSchema");

// Create a new transaction
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { date, amount, description } = req.body;
    const userId = req.user.userId;

    // Create a new transaction
    const newTransaction = new Transaction({
      userId,
      date,
      amount,
      description
    });
    await newTransaction.save();

    res.status(201).json({ message: "Transaction created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch all transactions of the current user
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch all transactions of the user
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a transaction
router.delete("/:transactionId", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { transactionId } = req.params;

    // Find the transaction by ID and ensure it belongs to the current user
    const transaction = await Transaction.findOne({ _id: transactionId, userId });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found or unauthorized" });
    }

    // Delete the transaction
    await Transaction.findByIdAndDelete(transactionId);

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
