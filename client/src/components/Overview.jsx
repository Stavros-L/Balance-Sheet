import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Overview.css";

function Overview() {
  const [expenses, setExpenses] = useState({});
  const [savings, setSavings] = useState({});
  const [salary, setSalary] = useState(0);

  useEffect(() => {
    // Fetch transactions data
    fetchTransactions();

    // Fetch user's salary
    fetchSalary();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const transactions = response.data;
      const processedData = processTransactionData(transactions);
      setExpenses(processedData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const processTransactionData = (transactions) => {
    const currentYear = new Date().getFullYear();
    const monthlyExpenses = {};
    transactions.forEach((transaction) => {
      const transactionYear = new Date(transaction.date).getFullYear();
      if (transactionYear === currentYear) {
        const month = new Date(transaction.date).getMonth() + 1;
        monthlyExpenses[month] =
          (monthlyExpenses[month] || 0) + transaction.amount;
      }
    });
    return monthlyExpenses;
  };

  const fetchSalary = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/auth/user-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSalary(response.data.salary);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    // Calculate savings after both expenses and salary are fetched
    const monthlySavings = {};
    const currentMonth = new Date().getMonth() + 1;
    for (let month = 1; month <= currentMonth; month++) {
      monthlySavings[month] = salary - (expenses[month] || 0);
    }
    setSavings(monthlySavings);
  }, [expenses, salary]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div>
      <h2>Overview</h2>
      <h3>Expenses</h3>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Expense</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(expenses).map((month) => (
            <tr key={month}>
              <td>{monthNames[month - 1]}</td>
              <td>{expenses[month]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Savings</h3>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Savings</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(savings).map((month) => (
            <tr key={month}>
              <td>{monthNames[month - 1]}</td>
              <td>{savings[month]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Overview;
