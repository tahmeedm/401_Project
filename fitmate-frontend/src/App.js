import React, { useState } from "react";

function App() {
  const [goal, setGoal] = useState(""); // State to store user input
  const [submittedGoal, setSubmittedGoal] = useState(null); // Store submitted goal

  const handleChange = (event) => {
    setGoal(event.target.value); // Update goal as user types
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedGoal(goal); // Save goal
    setGoal(""); // Clear input field
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to FitMate</h1>
      <p>Your AI-powered fitness and meal planner.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={goal}
          onChange={handleChange}
          placeholder="Enter your fitness goal"
          style={{ padding: "10px", width: "250px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Submit
        </button>
      </form>

      {submittedGoal && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
          Your goal: {submittedGoal}
        </p>
      )}
    </div>
  );
}

export default App;
