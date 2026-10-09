/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firedb from "../Firebase";

function Dashboard() {
  const navigate = useNavigate();
  const [count, setCount] = useState({
    projects: 0,
    skills: 0,
    certificates: 0,
    messages: 0,
    profile: 0,
  });

  useEffect(() => {
    firedb.child("Projects").on("value", (snapshot) => {
      setCount((prev) => ({
        ...prev,
        projects: snapshot.val() ? Object.keys(snapshot.val()).length : 0,
      }));
    });

    firedb.child("Skills").on("value", (snapshot) => {
      setCount((prev) => ({
        ...prev,
        skills: snapshot.val() ? Object.keys(snapshot.val()).length : 0,
      }));
    });

    firedb.child("Certificates").on("value", (snapshot) => {
      setCount((prev) => ({
        ...prev,
        certificates: snapshot.val() ? Object.keys(snapshot.val()).length : 0,
      }));
    });

    firedb.child("Messages").on("value", (snapshot) => {
      setCount((prev) => ({
        ...prev,
        messages: snapshot.val() ? Object.keys(snapshot.val()).length : 0,
      }));
    });

    firedb.child("Profile").on("value", (snapshot) => {
      setCount((prev) => ({
        ...prev,
        profile: snapshot.val() ? 1 : 0,
      }));
    });

    return () => {
      firedb.child("Projects").off();
      firedb.child("Skills").off();
      firedb.child("Certificates").off();
      firedb.child("Messages").off();
      firedb.child("Profile").off();
    };
  }, []);



  const cards = [
    { title: "Projects", count: count.projects, link: "/admin/projects", action: "Manage", color: "from-cyan-500 to-blue-500" },
    { title: "Skills", count: count.skills, link: "/admin/skills", action: "Manage", color: "from-emerald-500 to-teal-500" },
    { title: "Certificates", count: count.certificates, link: "/admin/certificates", action: "Manage", color: "from-purple-500 to-indigo-500" },
    { title: "Messages", count: count.messages, link: "/admin/messages", action: "View", color: "from-amber-500 to-orange-500" },
    { title: "Profile", count: count.profile, link: "/admin/profile", action: "Edit", color: "from-pink-500 to-rose-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Header with Logout & Public Link Actions */}
      <div className="border-b border-slate-700 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">
            Welcome Admin 👋
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Manage your portfolio content, credentials, and messages from here.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/"
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-semibold transition"
          >
            🌐 Public Site
          </Link>
        </div>
      </div>

      {/* Grid Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-slate-800/80 border border-slate-700/60 p-6 rounded-xl shadow-lg flex flex-col justify-between hover:border-slate-500 transition duration-200"
          >
            <div>
              <h2 className="text-lg font-semibold text-slate-300 mb-2">
                {card.title}
              </h2>
              <h3 className={`text-4xl font-extrabold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                {card.count}
              </h3>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/50 flex justify-end">
              <Link
                to={card.link}
                className="inline-block px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs rounded-lg transition"
              >
                {card.action} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;