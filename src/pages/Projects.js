/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import firedb from "../Firebase";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projRef = firedb.child("Projects");
    const handleValue = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProjects(list);
      } else {
        setProjects([]);
      }
      setLoading(false);
    };

    projRef.on("value", handleValue);
    return () => projRef.off("value", handleValue);
  }, []);

  return (
    <section className="py-12 max-w-6xl mx-auto px-4 space-y-8 bg-[#f8f9fa] text-zinc-900 font-sans min-h-[80vh]">
      {/* Title Section */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200/80 shadow-sm space-y-2">
        <span className="inline-block px-3.5 py-1.5 bg-cyan-50 text-cyan-700 border border-cyan-200/80 rounded-full text-xs font-semibold tracking-wide uppercase">
          Portfolio & Work
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Featured Projects
        </h2>
        <p className="text-zinc-500 text-sm">
          Recent work, web applications, and software builds
        </p>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center text-zinc-500 border border-zinc-200/80 shadow-sm">
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-zinc-400 border border-zinc-200/80 shadow-sm">
          No projects added yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white border border-zinc-200/80 rounded-3xl overflow-hidden shadow-sm hover:border-indigo-200 hover:shadow-md transition duration-200 flex flex-col justify-between"
            >
              <div className="p-6 space-y-3">
                {proj.image && (
                  <div className="relative group overflow-hidden rounded-2xl mb-4 border border-zinc-200/80 bg-zinc-100">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-zinc-900">
                  {proj.title}
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  {proj.description}
                </p>

                {proj.tags && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(Array.isArray(proj.tags)
                      ? proj.tags
                      : proj.tags.split(",")
                    ).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-cyan-50 text-cyan-800 border border-cyan-200/60 rounded-xl text-xs font-semibold"
                      >
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Links */}
              <div className="px-6 py-4 bg-zinc-50/80 border-t border-zinc-100 flex justify-between items-center text-xs font-semibold">
                {proj.github ? (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-600 hover:text-zinc-900 transition flex items-center gap-1"
                  >
                    <span>💻</span> GitHub Code
                  </a>
                ) : (
                  <span />
                )}
                {proj.live && (
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full transition shadow-xs"
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;