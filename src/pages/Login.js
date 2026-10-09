/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import firedb from "../Firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);

    firedb.child("Academy").once("value", (snapshot) => {
      const data = snapshot.val();
      let isAuthenticated = false;

      if (data) {
        for (let key in data) {
          if (data[key].email === email && data[key].password === password) {
            isAuthenticated = true;

            // Update user status to online/active
            firedb.child("Academy").child(key).update({ status: 1 });

            // Store user identity key in localStorage
            localStorage.setItem("userKey", key);

            setLoading(false);
            navigate("/admin");
            return;
          }
        }
      }

      setLoading(false);
      if (!isAuthenticated) {
        alert("Invalid email or password");
      }
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-[#f8f9fa] text-zinc-900 font-sans">
      <div className="w-full max-w-md bg-white border border-zinc-200/80 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="inline-block px-3.5 py-1.5 bg-cyan-50 text-cyan-700 border border-cyan-200/80 rounded-full text-xs font-semibold tracking-wide uppercase">
            Admin Access
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            Admin Login
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm">
            Sign in to manage your portfolio content
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={login} className="space-y-5">
          <div className="space-y-4">
            <div>
              <label className="block text-zinc-700 text-xs font-bold uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl p-3.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition duration-200"
              />
            </div>

            <div>
              <label className="block text-zinc-700 text-xs font-bold uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl p-3.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition duration-200"
              />
            </div>
          </div>

          <button
            id="b1"
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3.5 rounded-full transition duration-200 shadow-xs active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;