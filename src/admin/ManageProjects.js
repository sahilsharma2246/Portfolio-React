/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import firedb from "../Firebase";
import "./ManageProjects.css";

function ManageProjects() {

  const initialState = {
    title: "",
    technology: "",
    description: "",
    github: "",
    demo: "",
    image: ""
  };

  const [project, setProject] = useState(initialState);
  const [data, setData] = useState({});
  const [editKey, setEditKey] = useState("");

  useEffect(() => {

    firedb.child("Projects").on("value", (snapshot) => {

      if (snapshot.val() != null) {
        setData(snapshot.val());
      }
      else {
        setData({});
      }

    });

    return () => {
      firedb.child("Projects").off();
    };

  }, []);

  function handleChange(e) {

    setProject({
      ...project,
      [e.target.name]: e.target.value
    });

  }

  function saveProject() {

    if (
      project.title === "" ||
      project.technology === "" ||
      project.description === ""
    ) {
      alert("Fill all required fields");
      return;
    }

    if (editKey === "") {

      firedb.child("Projects").push(project, (err) => {

        if (err)
          alert(err);
        else
          alert("Project Added");

      });

    }

    else {

      firedb.child("Projects").child(editKey).set(project, (err) => {

        if (err)
          alert(err);
        else
          alert("Project Updated");

      });

      setEditKey("");

    }

    setProject(initialState);

  }

  function deleteProject(key) {

    if (window.confirm("Delete this Project?")) {

      firedb.child("Projects").child(key).remove((err) => {

        if (err)
          alert(err);
        else
          alert("Deleted");

      });

    }

  }

  function editProject(key) {

    setProject(data[key]);
    setEditKey(key);

  }

  return (

    <div className="manage-projects">

      <h2>Manage Projects</h2>

      <div className="project-form">

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={project.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="technology"
          placeholder="Technology"
          value={project.technology}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={project.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="github"
          placeholder="Github Link"
          value={project.github}
          onChange={handleChange}
        />

        <input
          type="text"
          name="demo"
          placeholder="Live Demo"
          value={project.demo}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={project.image}
          onChange={handleChange}
        />

        <button onClick={saveProject}>
          {editKey ? "Update Project" : "Add Project"}
        </button>

      </div>

      <table>

        <thead>

          <tr>

            <th>Title</th>
            <th>Technology</th>
            <th>Github</th>
            <th>Demo</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {Object.keys(data).map((key) => (

            <tr key={key}>

              <td>{data[key].title}</td>

              <td>{data[key].technology}</td>

              <td>

                <a
                  href={data[key].github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHUB
                </a>

              </td>

              <td>

                <a
                  href={data[key].demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Demo
                </a>

              </td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() => editProject(key)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteProject(key)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default ManageProjects;