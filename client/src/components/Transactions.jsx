import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Transactions.css";

function Transactions() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from the server on component mount
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  };

  const addTransaction = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:5000/api/transactions",
        {
          date,
          amount,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Update transactions state with the new transaction
        fetchTransactions();
        // Clear input fields after successful addition
        setDate("");
        setAmount("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Error adding transaction:", error);
      });
  };

  const deleteTransaction = (transactionId) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5000/api/transactions/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Update transactions state after successful deletion
        fetchTransactions();
      })
      .catch((error) => {
        console.error("Error deleting transaction:", error);
      });
  };

  return (
    <div>
      <h2>Transactions</h2>
      
      <div className="transaction-input">
        <div className="transaction-input-upper">
          <label>Date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
          <label>Amount: <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}size="3"/></label>
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button onClick={addTransaction}>Add Transaction</button>
      </div>

      <div>
        <h3>Transaction List</h3>
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              <div className="transaction-item">
                <p className="transaction-details">
                  Date: {new Date(transaction.date).toLocaleDateString()} | Amount:{" "}
                  {transaction.amount} | Description: {transaction.description}
                  <button onClick={() => deleteTransaction(transaction._id)}>
                  Delete ❌
                </button>
                </p>

              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Transactions;
