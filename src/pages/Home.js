/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firedb from "../Firebase";

function Home() {
  // 1. Initialize state instantly from localStorage if available
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("cached_profile_data");
    return savedProfile ? JSON.parse(savedProfile) : {};
  });

  const [loading, setLoading] = useState(() => !localStorage.getItem("cached_profile_data"));

  useEffect(() => {
    // 2. Use once("value") instead of on("value") for faster one-time fetch
    const fetchProfile = async () => {
      try {
        const snapshot = await firedb.child("Profile").once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          setProfile(data);
          // Cache to localStorage for instant load on subsequent navigations
          localStorage.setItem("cached_profile_data", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-[#f8f9fa] text-zinc-900 font-sans">
      <div className="max-w-5xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 bg-white p-8 sm:p-12 rounded-3xl border border-zinc-200/80 shadow-sm">
        {/* Left Section: Content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <span className="inline-block px-3.5 py-1.5 bg-cyan-50 text-cyan-700 border border-cyan-200/80 rounded-full text-xs font-semibold tracking-wide uppercase">
            {profile.title || "Full-Stack Web Developer"}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-zinc-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent">
              {profile.name || "Developer"}
            </span>
          </h1>

          <p className="text-zinc-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
            {profile.about ||
              "Specializing in building modern, responsive web applications with React, Tailwind CSS, and Firebase cloud architectures."}
          </p>

          {/* Key Info Badges */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-1 text-xs text-zinc-600">
            {profile.location && (
              <span className="flex items-center gap-1.5 bg-zinc-50 px-3.5 py-2 rounded-xl border border-zinc-200/80 shadow-xs">
                📍 {profile.location}
              </span>
            )}
            {profile.email && (
              <span className="flex items-center gap-1.5 bg-zinc-50 px-3.5 py-2 rounded-xl border border-zinc-200/80 shadow-xs">
                ✉️ {profile.email}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
            <Link
              to="/projects"
              className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-full transition-colors shadow-md text-sm"
            >
              View My Work
            </Link>
            {profile.resume && (
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                download
                className="px-6 py-3 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 font-semibold rounded-full transition-colors text-sm"
              >
                Download Resume
              </a>
            )}
            <Link
              to="/contact"
              className="px-6 py-3 bg-indigo-50 hover:bg-indigo-100/80 text-indigo-900 font-semibold rounded-full transition-colors text-sm border border-indigo-200/60"
            >
              Contact Me
            </Link>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="shrink-0 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-cyan-200 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500"></div>

          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-2 border-zinc-200 bg-zinc-100 shadow-sm">
            {loading && !profile.image ? (
              <div className="w-full h-full bg-zinc-200 animate-pulse" />
            ) : (
              <img
                src={profile.image || "https://via.placeholder.com/350"}
                alt={profile.name || "Profile Avatar"}
                loading="eager"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;