/* eslint-disable eqeqeq */

import React, { useEffect, useState } from "react";
import firedb from "../Firebase";
import "./ManageSkill.css";

function ManageSkill() {

  const initialState = {
    category: "",
    skills: ""
  };

  const [data, setData] = useState(initialState);
  const [skills, setSkills] = useState({});
  const [editId, setEditId] = useState("");

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = () => {

    firedb.child("Skills").on("value", (snapshot) => {

      if (snapshot.val() != null)
        setSkills(snapshot.val());
      else
        setSkills({});

    });

  };

  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value
    });

  };

  const saveSkill = () => {

    if (data.category === "" || data.skills === "") {
      alert("Fill all fields");
      return;
    }

    if (editId === "") {

      firedb.child("Skills").push(data, (err) => {

        if (err)
          alert(err);
        else {
          alert("Added Successfully");
          setData(initialState);
        }

      });

    }
    else {

      firedb.child(`Skills/${editId}`).set(data, (err) => {

        if (err)
          alert(err);
        else {
          alert("Updated Successfully");
          setEditId("");
          setData(initialState);
        }

      });

    }

  };

  const editSkill = (id) => {

    setData(skills[id]);
    setEditId(id);

  };

  const deleteSkill = (id) => {

    if (window.confirm("Delete this category?")) {

      firedb.child(`Skills/${id}`).remove();

    }

  };

  return (

    <div className="manage-skill">

      <h2>Manage Skills</h2>

      <div className="skill-form">

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={data.category}
          onChange={handleChange}
        />

        <textarea
          rows="5"
          name="skills"
          placeholder="JavaScript, React, Node..."
          value={data.skills}
          onChange={handleChange}
        />

        <button onClick={saveSkill}>
          {editId ? "Update Category" : "Add Category"}
        </button>

      </div>

      <div className="skill-list">

        {
          Object.keys(skills).map((id) => (

            <div className="skill-card" key={id}>

              <h3>{skills[id].category}</h3>

              <p>{skills[id].skills}</p>

              <div className="skill-actions">

                <button
                  className="edit-btn"
                  onClick={() => editSkill(id)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteSkill(id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default ManageSkill;