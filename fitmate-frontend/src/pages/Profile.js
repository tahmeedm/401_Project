import React, { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    bmi: "",
    dietaryPreferences: "",
    email: "",
  });

  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState(false);

  const calculateBMI = (weight, height) => {
    if (weight && height) {
      return (weight / ((height / 100) ** 2)).toFixed(2);
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedProfile = { ...profile, [name]: value };
    if (name === "weight" || name === "height") {
      updatedProfile.bmi = calculateBMI(updatedProfile.weight, updatedProfile.height);
    }
    setProfile(updatedProfile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaved(true);
    console.log("Profile saved:", profile);

    try {
      const response = await fetch("/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        console.log("Profile successfully sent to API");
      } else {
        console.error("Failed to send profile data");
      }
    } catch (error) {
      console.error("Error sending profile data:", error);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <div className="text-center">
      <h2>Your Profile Setup</h2>
      <form className="mt-3" onSubmit={handleSubmit}>
        {step === 1 && (
          <input type="text" name="name" placeholder="Name" onChange={handleChange} className="form-control mb-2" required />
        )}
        {step === 2 && (
          <input type="number" name="age" placeholder="Age" onChange={handleChange} className="form-control mb-2" required />
        )}
        {step === 3 && (
          <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} className="form-control mb-2" required />
        )}
        {step === 4 && (
          <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} className="form-control mb-2" required />
        )}
        {step === 5 && (
          <input type="text" name="dietaryPreferences" placeholder="Dietary Preferences (e.g., Halal, Vegan)" onChange={handleChange} className="form-control mb-2" required />
        )}
        {step === 6 && (
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" required />
        )}
        
        {step < 6 ? (
          <button type="button" onClick={nextStep} className="btn btn-secondary">Next</button>
        ) : (
          <button type="submit" className="btn btn-primary">Generate Plan</button>
        )}
      </form>

      {saved && <p className="text-success mt-2">Profile details saved successfully!</p>}
    </div>
  );
}

export default Profile;
