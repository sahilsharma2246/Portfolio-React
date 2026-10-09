/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import firedb from "../Firebase";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const skillsRef = firedb.child("Skills");
    const handleValue = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setSkills(list);
      } else {
        setSkills([]);
      }
      setLoading(false);
    };

    skillsRef.on("value", handleValue);
    return () => skillsRef.off("value", handleValue);
  }, []);

  return (
    <section className="py-12 max-w-6xl mx-auto px-4 space-y-8 bg-[#f8f9fa] text-zinc-900 font-sans min-h-[80vh]">
      {/* Title Section */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200/80 shadow-sm space-y-2">
        <span className="inline-block px-3.5 py-1.5 bg-cyan-50 text-cyan-700 border border-cyan-200/80 rounded-full text-xs font-semibold tracking-wide uppercase">
          My Expertise
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Technical Skills & Competencies
        </h2>
        <p className="text-zinc-500 text-sm">
          Programming languages, frameworks, databases, and developer tools
        </p>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center text-zinc-500 border border-zinc-200/80 shadow-sm">
          Loading skills...
        </div>
      ) : skills.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-zinc-400 border border-zinc-200/80 shadow-sm">
          No skills found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((item) => {
            const rawSkills =
              item.skills || item.items || item.languages || item.name || "";

            const skillList =
              typeof rawSkills === "string"
                ? rawSkills.split(",").map((s) => s.trim()).filter(Boolean)
                : Array.isArray(rawSkills)
                ? rawSkills
                : [];

            return (
              <div
                key={item.id}
                className="bg-white border border-zinc-200/80 p-6 rounded-3xl shadow-sm space-y-4 hover:border-indigo-200 hover:shadow-md transition duration-200"
              >
                {/* Category Header */}
                <h3 className="text-xl font-bold text-zinc-900 border-b border-zinc-100 pb-3">
                  {item.category || item.title || "Category"}
                </h3>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {skillList.length > 0 ? (
                    skillList.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-cyan-50 text-cyan-800 border border-cyan-200/60 rounded-xl text-xs font-semibold shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-zinc-400 italic">
                      No skills listed
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Skills;