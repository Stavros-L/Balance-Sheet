const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    default: 0,
  },
  monthlyBudget: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Transaction model
      ref: "Transaction", // Name of the model to which this ObjectId references
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
