/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import firedb from "../Firebase";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    about: "",
    email: "",
    phone: "",
    location: "",
    image: "",
    resume: "",
  });

  useEffect(() => {
    firedb.child("Profile").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        const data = snapshot.val();
        setProfile({
          ...data,
          image: formatImageUrl(data.image || ""),
        });
      }
    });
  }, []);

  // Converts standard Google Drive view/share links into direct image URLs
  const formatImageUrl = (url) => {
    if (!url) return "";
    let cleanUrl = url.trim();

    // Handle Google Drive links
    if (cleanUrl.includes("drive.google.com")) {
      let fileId = "";
      if (cleanUrl.includes("/d/")) {
        fileId = cleanUrl.split("/d/")[1]?.split("/")[0]?.split("?")[0];
      } else if (cleanUrl.includes("id=")) {
        fileId = cleanUrl.split("id=")[1]?.split("&")[0];
      }
      if (fileId) {
        return `https://lh3.googleusercontent.com/d/${fileId}`;
      }
    }

    // Add https protocol if missing
    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = `https://${cleanUrl}`;
    }

    return cleanUrl;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: name === "image" ? formatImageUrl(value) : value,
    }));
  };

  const handleImageBlur = (e) => {
    const formatted = formatImageUrl(e.target.value);
    setProfile((prev) => ({ ...prev, image: formatted }));
  };

  const saveProfile = (e) => {
    e.preventDefault();
    const dataToSave = {
      ...profile,
      image: formatImageUrl(profile.image),
    };

    firedb.child("Profile").set(dataToSave, (err) => {
      if (err) {
        alert("Error saving profile: " + err);
      } else {
        alert("Profile details updated successfully!");
      }
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-2">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-5">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Manage Profile Details
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Updates here reflect directly on your public Home, About, and Resume pages.
        </p>
      </div>

      {/* Main Form Container */}
      <form
        onSubmit={saveProfile}
        className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl space-y-6 shadow-2xl backdrop-blur-md"
      >
        {/* 1. Basic Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-2">
            1. Basic Info
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Sahil Sharma"
                value={profile.name || ""}
                onChange={handleChange}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Profession / Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Full-Stack Developer"
                value={profile.title || ""}
                onChange={handleChange}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              About Me Bio
            </label>
            <textarea
              name="about"
              rows="4"
              placeholder="Write a short summary..."
              value={profile.about || ""}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition leading-relaxed"
            />
          </div>
        </div>

        {/* 2. Contact Information */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-2">
            2. Contact Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@domain.com"
                value={profile.email || ""}
                onChange={handleChange}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                placeholder="+91 9876543210"
                value={profile.phone || ""}
                onChange={handleChange}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Rohtak, India"
                value={profile.location || ""}
                onChange={handleChange}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition"
              />
            </div>
          </div>
        </div>

        {/* 3. Media & File Links */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-2">
            3. Media & File Links
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Profile Image URL
              </label>
              <input
                type="text"
                name="image"
                placeholder="Paste image URL or Google Drive share link..."
                value={profile.image || ""}
                onChange={handleChange}
                onBlur={handleImageBlur}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Resume File / PDF Link URL
              </label>
              <input
                type="text"
                name="resume"
                placeholder="https://drive.google.com/..."
                value={profile.resume || ""}
                onChange={handleChange}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition"
              />
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-cyan-500/20 active:scale-[0.99]"
          >
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;