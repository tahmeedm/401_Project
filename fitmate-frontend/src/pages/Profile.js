import React, { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="text-center">
      <h2>Your Profile</h2>
      <form className="mt-3">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="form-control mb-2" />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} className="form-control mb-2" />
        <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} className="form-control mb-2" />
        <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} className="form-control mb-2" />
      </form>

      <h4 className="mt-3">Profile Details</h4>
      <p>Name: {profile.name}</p>
      <p>Age: {profile.age}</p>
      <p>Weight: {profile.weight} kg</p>
      <p>Height: {profile.height} cm</p>
    </div>
  );
}

export default Profile;
