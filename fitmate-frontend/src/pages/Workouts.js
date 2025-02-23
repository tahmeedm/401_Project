import React from "react";

const workouts = [
  { goal: "Lose Weight", workout: "Cardio (Running, Cycling, HIIT)" },
  { goal: "Gain Muscle", workout: "Weight Lifting (Bench Press, Squats, Deadlifts)" },
  { goal: "General Fitness", workout: "Yoga, Pilates, Bodyweight Exercises" },
];

function Workouts() {
  return (
    <div className="text-center">
      <h2>Workout Recommendations</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Fitness Goal</th>
            <th>Recommended Workout</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((w, index) => (
            <tr key={index}>
              <td>{w.goal}</td>
              <td>{w.workout}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Workouts;
