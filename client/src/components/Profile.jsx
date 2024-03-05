import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css"; // Import your CSS file

function Profile() {
  const [salary, setSalary] = useState(0);
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const token = localStorage.getItem("token"); // Retrieve the token

  useEffect(() => {
    // Fetch user profile data from the backend
    axios.get("http://localhost:5000/api/auth/user-profile", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      },
    })
    .then((response) => {
      // Update salary and monthly budget state with the fetched data
      setSalary(response.data.salary);
      setMonthlyBudget(response.data.monthlyBudget);
    })
    .catch((error) => {
      console.error("Error fetching user profile data:", error);
    });
  }, [token]); // Fetch data only when token changes

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  const handleMonthlyBudgetChange = (event) => {
    setMonthlyBudget(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send request to update salary
      await axios.put("http://localhost:5000/api/auth/update-salary", { newSalary: salary }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });

      // Send request to update monthly budget
      await axios.put("http://localhost:5000/api/auth/update-monthly-budget", { newMonthlyBudget: monthlyBudget }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });

      // Show alert after successfully updating the profile
      alert("Profile updated successfully!");

      // Optionally, fetch updated user data and update the UI

    } catch (error) {
      console.error("Error updating profile:", error);   // Handling error
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-header">Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          Salary:
          <input type="number" value={salary} onChange={handleSalaryChange} />
        </label>
        <label>
          Monthly Budget:
          <input type="number" value={monthlyBudget} onChange={handleMonthlyBudgetChange} />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
