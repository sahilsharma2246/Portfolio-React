/* eslint-disable eqeqeq */
import React, { useState } from "react";
import firedb from "../Firebase";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setStatus("");

    firedb.child("Messages").push(
      {
        ...form,
        timestamp: new Date().toISOString(),
      },
      (error) => {
        setLoading(false);
        if (error) {
          setStatus("Failed to send message. Please try again.");
        } else {
          setStatus("Message sent successfully!");
          setForm({ name: "", email: "", message: "" });
        }
      }
    );
  };

  return (
    <section className="py-12 max-w-2xl mx-auto px-4 space-y-8 bg-[#f8f9fa] text-zinc-900 font-sans min-h-[80vh] flex flex-col justify-center">
      {/* Title Card */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200/80 shadow-sm text-center space-y-2">
        <span className="inline-block px-3.5 py-1.5 bg-cyan-50 text-cyan-700 border border-cyan-200/80 rounded-full text-xs font-semibold tracking-wide uppercase">
          Get In Touch
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Contact Me
        </h2>
        <p className="text-zinc-500 text-sm max-w-md mx-auto">
          Have a project or opportunity? Send a message below.
        </p>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-zinc-200/80 p-8 sm:p-10 rounded-3xl space-y-5 shadow-sm"
      >
        <div>
          <label className="block text-zinc-700 text-xs font-bold uppercase tracking-wider mb-2">
            Your Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. John Doe"
            className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl p-3.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition duration-200"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-zinc-700 text-xs font-bold uppercase tracking-wider mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="john@example.com"
            className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl p-3.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition duration-200"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-zinc-700 text-xs font-bold uppercase tracking-wider mb-2">
            Message
          </label>
          <textarea
            required
            rows="5"
            placeholder="Write your message here..."
            className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl p-3.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition duration-200 leading-relaxed"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3.5 rounded-full transition duration-200 shadow-xs disabled:opacity-50 text-sm"
        >
          {loading ? "Sending..." : "Send Message →"}
        </button>

        {status && (
          <p
            className={`text-center text-xs font-bold pt-2 ${
              status.includes("successfully")
                ? "text-emerald-600"
                : "text-rose-600"
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </section>
  );
}

export default Contact;