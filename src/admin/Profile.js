/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import firedb from "../Firebase";
import "./Profile.css";

function Profile() {

  const initialState = {
    name: "",
    title: "",
    about: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    resume: "",
    image: "",
    college: "",
    degree: "",
    cgpa: ""
  };

  const [profile, setProfile] = useState(initialState);

  useEffect(() => {

    firedb.child("Profile").once("value", (snapshot) => {

      if (snapshot.val() != null) {
        setProfile({
          ...initialState,
          ...snapshot.val()
        });
      }

    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });

  };

  const saveProfile = () => {

    firedb.child("Profile").set(profile, (err) => {

      if (err)
        alert(err);
      else
        alert("Profile Updated Successfully");

    });

  };

  return (

    <div className="profile">

      <h2>Profile-Settings</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={profile.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="title"
        placeholder="Professional Title"
        value={profile.title}
        onChange={handleChange}
      />

      <textarea
        name="about"
        rows="5"
        placeholder="About Yourself"
        value={profile.about}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={profile.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={profile.phone}
        onChange={handleChange}
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={profile.location}
        onChange={handleChange}
      />

      <input
        type="text"
        name="github"
        placeholder="GitHub URL"
        value={profile.github}
        onChange={handleChange}
      />

      <input
        type="text"
        name="linkedin"
        placeholder="LinkedIn URL"
        value={profile.linkedin}
        onChange={handleChange}
      />

      <input
        type="text"
        name="resume"
        placeholder="Resume URL"
        value={profile.resume}
        onChange={handleChange}
      />

      <input
        type="text"
        name="image"
        placeholder="Profile Image URL"
        value={profile.image}
        onChange={handleChange}
      />

      <input
        type="text"
        name="college"
        placeholder="College Name"
        value={profile.college}
        onChange={handleChange}
      />

      <input
        type="text"
        name="degree"
        placeholder="Degree"
        value={profile.degree}
        onChange={handleChange}
      />

      <input
        type="text"
        name="cgpa"
        placeholder="CGPA"
        value={profile.cgpa}
        onChange={handleChange}
      />

      <button onClick={saveProfile}>
        Save Profile
      </button>

    </div>

  );
}

export default Profile;