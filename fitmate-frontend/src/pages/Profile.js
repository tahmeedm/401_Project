import React, { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    email: "",
    password: "",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setSaved(true);
    console.log("Profile saved:", profile);
  };

  return (
    <div className="text-center">
      <h2>Your Profile</h2>
      <form className="mt-3" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="form-control mb-2" />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} className="form-control mb-2" />
        <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} className="form-control mb-2" />
        <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} className="form-control mb-2" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="form-control mb-2" />
        <button type="submit" className="btn btn-primary">Save</button>
      </form>

      {saved && <p className="text-success mt-2">Profile details saved successfully!</p>}

      <h4 className="mt-3">Profile Details</h4>
      <p>Name: {profile.name}</p>
      <p>Age: {profile.age}</p>
      <p>Weight: {profile.weight} kg</p>
      <p>Height: {profile.height} cm</p>
      <p>Email: {profile.email}</p>
      <p>Password: {profile.password}</p>
    </div>
  );
}

export default Profile;
