import React, { useState } from "react";
import { getPersonalizedAdvice } from "../agent";

function Home() {
  const [advice, setAdvice] = useState("");

  // TODO fix example into fields
  const userProfile = {
    age: 30,
    gender: "Male",
    height: 175,
    weight: 70,
    activityLevel: "Moderate",
    goals: "Weight Loss",
    dietaryPreferences: "Vegetarian",
    allergies: "None",
    physicalConditions: "None",
  };

  return (
    <div className="text-center">
      <h1>Welcome to FitMate</h1>
      <p>Track your fitness goals and get AI-powered workout plans.</p>
      <img src="https://source.unsplash.com/600x300/?fitness,gym" alt="Fitness" className="img-fluid mt-3" />
      <button className="btn btn-primary mt-3" onClick={() => getPersonalizedAdvice(userProfile, setAdvice)}>
        Get AI Advice
      </button>
      {advice && <p className="mt-3">{advice}</p>}
    </div>
  );
}

export default Home;
