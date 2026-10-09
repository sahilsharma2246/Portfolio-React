import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import firedb from "../Firebase";

function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      const userKey = localStorage.getItem("userKey");
      if (userKey) {
        firedb.child("Academy").child(userKey).update({ status: 0 });
        localStorage.removeItem("userKey");
      }
      navigate("/login");
    }
  };

  const adminLinks = [
    { name: "Dashboard", path: "/admin" },
    { name: "Projects", path: "/admin/projects" },
    { name: "Skills", path: "/admin/skills" },
    { name: "Certificates", path: "/admin/certificates" },
    { name: "Messages", path: "/admin/messages" },
    { name: "Profile", path: "/admin/profile" },
  ];

  return (
    <div className="space-y-6">
      {/* Admin Top Navigation Header */}
      <header className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-xl font-bold text-cyan-400">
            Admin Panel
          </Link>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-400 hover:text-cyan-400 transition hidden sm:inline"
          >
            🌐 Public Site ↗
          </Link>
        </div>

        {/* Admin Navigation Tabs */}
        <nav className="flex flex-wrap items-center gap-2">
          {adminLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="ml-auto md:ml-2 px-3 py-1.5 bg-red-600/80 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition shadow-md"
          >
            Logout 🚪
          </button>
        </nav>
      </header>

      {/* Main Admin Page Content */}
      <div className="bg-slate-900/40 p-2 sm:p-4 rounded-xl">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;