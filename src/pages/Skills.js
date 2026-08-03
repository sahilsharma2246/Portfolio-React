/* eslint-disable eqeqeq */

import { useEffect, useState } from "react";
import firedb from "../Firebase";
import "./Skills.css";

function Skills() {

  const [skills, setSkills] = useState({});

  useEffect(() => {

    firedb.child("Skills").on("value", (snapshot) => {

      if (snapshot.val() != null) {
        setSkills(snapshot.val());
      } else {
        setSkills({});
      }

    });

    return () => firedb.child("Skills").off();

  }, []);

  return (

    <section className="skills">

      <div className="container">

        <div className="section-title">

          <h2>Skills</h2>

          <p>Technologies and tools I use for building modern web applications.</p>

        </div>

        <div className="skills-card">

          {
            Object.keys(skills).map((id) => (

              <div
                className="skill-row"
                key={id}
              >

                <span className="skill-category">
                  {skills[id].category}:
                </span>

                <span className="skill-items">
                  {skills[id].skills}
                </span>

              </div>

            ))
          }

        </div>

      </div>

    </section>

  );

}

export default Skills;