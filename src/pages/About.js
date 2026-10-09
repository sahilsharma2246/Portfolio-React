/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import firedb from "../Firebase";

function About() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    firedb.child("Profile").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setProfile(snapshot.val());
      }
    });

    return () => firedb.child("Profile").off();
  }, []);

  return (
    <section className="py-12 bg-[#f8f9fa] text-zinc-900 font-sans min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white p-8 sm:p-12 rounded-3xl border border-zinc-200/80 shadow-sm space-y-8">
        
        {/* Title Section */}
        <div className="border-b border-zinc-200 pb-4">
          <span className="inline-block px-3.5 py-1.5 bg-cyan-50 text-cyan-700 border border-cyan-200/80 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
            Get To Know Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            About Me
          </h2>
          <p className="text-zinc-500 text-sm mt-1">
            A quick overview of my background, skills, and contact details.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start">
          
          {/* Profile Image */}
          {profile.image && (
            <div className="w-full md:w-1/3 flex justify-center shrink-0 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-cyan-200 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <img
                src={profile.image}
                alt={profile.name || "Profile"}
                className="relative w-60 h-60 sm:w-64 sm:h-64 object-cover rounded-3xl border-2 border-zinc-200 bg-zinc-100 shadow-sm group-hover:scale-105 transition duration-500"
              />
            </div>
          )}

          {/* Profile Text & Info */}
          <div className="w-full md:w-2/3 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-2">
                {profile.name || "Developer"}
              </h3>
              <p className="text-zinc-600 leading-relaxed text-sm sm:text-base">
                {profile.about ||
                  "Specializing in building modern, responsive web applications with React, Tailwind CSS, and Firebase cloud architectures."}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50 border border-zinc-200/80 p-5 rounded-2xl text-xs sm:text-sm">
              <div>
                <span className="font-semibold text-cyan-700">Email :</span>{" "}
                <span className="text-zinc-700 font-medium">{profile.email}</span>
              </div>
              <div>
                <span className="font-semibold text-cyan-700">Phone :</span>{" "}
                <span className="text-zinc-700 font-medium">{profile.phone}</span>
              </div>
              <div>
                <span className="font-semibold text-cyan-700">Location :</span>{" "}
                <span className="text-zinc-700 font-medium">{profile.location}</span>
              </div>
              <div>
                <span className="font-semibold text-cyan-700">Profession :</span>{" "}
                <span className="text-zinc-700 font-medium">{profile.title}</span>
              </div>
            </div>

            {/* Resume Button */}
            {profile.resume && (
              <div className="pt-2">
                <a
                  href={profile.resume}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-7 py-3 rounded-full shadow-md transition duration-200 text-sm"
                >
                  Download Resume
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;