/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import firedb from "../Firebase";

function ManageSkills() {
  const initialState = {
    category: "",
    skills: "",
  };

  const [skill, setSkill] = useState(initialState);
  const [skillsList, setSkillsList] = useState({});
  const [editId, setEditId] = useState("");

  useEffect(() => {
    firedb.child("Skills").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setSkillsList(snapshot.val());
      } else {
        setSkillsList({});
      }
    });
  }, []);

  const handleChange = (e) => {
    setSkill({ ...skill, [e.target.name]: e.target.value });
  };

  const saveSkill = (e) => {
    e.preventDefault();
    if (!skill.category) {
      alert("Please enter a Skill Category");
      return;
    }

    if (editId) {
      firedb.child(`Skills/${editId}`).set(skill, (err) => {
        if (!err) {
          alert("Skill Category Updated Successfully");
          setSkill(initialState);
          setEditId("");
        }
      });
    } else {
      firedb.child("Skills").push(skill, (err) => {
        if (!err) {
          alert("Skill Category Added Successfully");
          setSkill(initialState);
        }
      });
    }
  };

  const deleteSkill = (id) => {
    if (window.confirm("Are you sure you want to delete this skill group?")) {
      firedb.child(`Skills/${id}`).remove();
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-700 pb-4">
        <h2 className="text-2xl font-bold text-white">Manage Skills</h2>
        <p className="text-slate-400 text-sm">Add or edit skill categories and individual programming languages</p>
      </div>

      {/* Form */}
      <form onSubmit={saveSkill} className="bg-slate-800/80 border border-slate-700/60 p-6 rounded-xl space-y-4 shadow-xl">
        <h3 className="text-lg font-semibold text-cyan-400">
          {editId ? "Edit Skill Category" : "Add Skill Category"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-300 mb-1">Category Name</label>
            <input
              type="text"
              name="category"
              placeholder="e.g. Languages:"
              value={skill.category}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">Skills / Languages (Comma-separated)</label>
            <input
              type="text"
              name="skills"
              placeholder="e.g. JavaScript (ES6+), Python, C"
              value={skill.skills || skill.items || ""}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition">
            {editId ? "Update Category" : "Add Category"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={() => {
                setSkill(initialState);
                setEditId("");
              }}
              className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-lg transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white">Skill Categories</h3>
        {Object.keys(skillsList).length === 0 ? (
          <p className="text-slate-500 text-sm">No skill categories added yet.</p>
        ) : (
          Object.keys(skillsList).map((id) => {
            const group = skillsList[id];
            const rawVal = group.skills || group.items || group.languages || group.name || "";
            const parsedItems = typeof rawVal === "string"
              ? rawVal.split(",").map((s) => s.trim()).filter(Boolean)
              : Array.isArray(rawVal)
              ? rawVal
              : [];

            return (
              <div key={id} className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl flex items-center justify-between gap-4 shadow-md">
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-base">{group.category || "Uncategorized"}</h4>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {parsedItems.map((item, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 bg-slate-900 text-cyan-400 text-xs rounded border border-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setSkill({
                        category: group.category || "",
                        skills: group.skills || group.items || "",
                      });
                      setEditId(id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-3 py-1.5 bg-amber-600/80 hover:bg-amber-500 text-white text-xs font-semibold rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSkill(id)}
                    className="px-3 py-1.5 bg-red-600/80 hover:bg-red-500 text-white text-xs font-semibold rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ManageSkills;