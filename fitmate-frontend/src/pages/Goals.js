import React, { useState } from "react";

function Goals() {
  const [goal, setGoal] = useState("");
  const [goalList, setGoalList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (goal.trim() !== "") {
      setGoalList([...goalList, goal]);
      setGoal("");
    }
  };

  return (
    <div className="text-center">
      <h2>Set Your Fitness Goals</h2>
      <form onSubmit={handleSubmit} className="d-flex justify-content-center mt-3">
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Enter your fitness goal"
          className="form-control w-50 me-2"
        />
        <button type="submit" className="btn btn-primary">Add Goal</button>
      </form>

      <ul className="list-group mt-3">
        {goalList.map((g, index) => (
          <li key={index} className="list-group-item">{g}</li>
        ))}
      </ul>
    </div>
  );
}

export default Goals;
