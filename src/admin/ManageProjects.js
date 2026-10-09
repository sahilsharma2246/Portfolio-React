/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import firedb from "../Firebase";

function ManageProjects() {
  const initialState = {
    title: "",
    description: "",
    image: "",
    tech: "",
    github: "",
    live: "",
  };

  const [project, setProject] = useState(initialState);
  const [projects, setProjects] = useState({});
  const [editId, setEditId] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    firedb.child("Projects").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setProjects(snapshot.val());
      } else {
        setProjects({});
      }
    });
  };

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const saveProject = (e) => {
    if (e) e.preventDefault();
    if (project.title === "") {
      alert("Enter Project Title");
      return;
    }

    if (editId) {
      // Update Project
      firedb.child(`Projects/${editId}`).set(project, (err) => {
        if (err) {
          alert(err);
        } else {
          alert("Project Updated Successfully");
          setProject(initialState);
          setEditId("");
        }
      });
    } else {
      // Add Project
      firedb.child("Projects").push(project, (err) => {
        if (err) {
          alert(err);
        } else {
          alert("Project Added Successfully");
          setProject(initialState);
        }
      });
    }
  };

  const editProject = (id) => {
    setProject({
      ...projects[id],
    });
    setEditId(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      firedb.child(`Projects/${id}`).remove((err) => {
        if (err) {
          alert(err);
        } else {
          alert("Project Deleted");
        }
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-700 pb-4">
        <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
        <p className="text-slate-400 text-sm">Add, edit, or remove featured portfolio projects</p>
      </div>

      {/* Project Form */}
      <form onSubmit={saveProject} className="bg-slate-800/80 border border-slate-700/60 p-6 rounded-xl space-y-4 shadow-xl">
        <h3 className="text-lg font-semibold text-cyan-400">
          {editId ? "Edit Project Details" : "Add New Project"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={project.title}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />

          <input
            type="text"
            name="tech"
            placeholder="Tech Stack (e.g. React, Tailwind, Firebase)"
            value={project.tech}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <textarea
          name="description"
          placeholder="Project Description"
          rows="3"
          value={project.description}
          onChange={handleChange}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="image"
            placeholder="Project Image URL"
            value={project.image}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />

          <input
            type="text"
            name="github"
            placeholder="Github Repository URL"
            value={project.github}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />

          <input
            type="text"
            name="live"
            placeholder="Live Demo URL"
            value={project.live}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition"
          >
            {editId ? "Update Project" : "Add Project"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={() => {
                setProject(initialState);
                setEditId("");
              }}
              className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-lg transition"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Projects List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Existing Projects</h3>
        {Object.keys(projects).length === 0 ? (
          <p className="text-slate-500 text-sm">No projects added yet.</p>
        ) : (
          Object.keys(projects).map((id) => (
            <div
              key={id}
              className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-slate-600 transition"
            >
              <div>
                <h4 className="text-lg font-bold text-white">{projects[id].title}</h4>
                <p className="text-sm text-slate-400 line-clamp-1">{projects[id].description}</p>
                {projects[id].tech && (
                  <span className="inline-block mt-2 text-xs text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded">
                    {projects[id].tech}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => editProject(id)}
                  className="px-4 py-1.5 bg-amber-600/80 hover:bg-amber-500 text-white text-xs font-semibold rounded transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProject(id)}
                  className="px-4 py-1.5 bg-red-600/80 hover:bg-red-500 text-white text-xs font-semibold rounded transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageProjects;