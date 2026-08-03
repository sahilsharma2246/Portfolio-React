/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import firedb from "../Firebase";
import "./About.css";

function About() {

  const [profile, setProfile] = useState({});

  useEffect(() => {

    firedb.child("Profile").on("value", (snapshot) => {

      if (snapshot.val() != null) {
        setProfile(snapshot.val());
      }

    });

    return () => firedb.child("Profile").off();

  }, []);

  return (

    <section className="about">

      <div className="container">

        <div className="section-title">
          <h2>About Me</h2>
          <p>Know more about me.</p>
        </div>

        <div className="about-content">

          <div className="about-image">

            <img
              src={profile.image}
              alt={profile.name}
            />

          </div>

          <div className="about-text">

            <h3>{profile.name}</h3>

            <p>{profile.about}</p>

            <div className="about-info">

              <div>
                <strong>Email :</strong> {profile.email}
              </div>

              <div>
                <strong>Phone :</strong> {profile.phone}
              </div>

              <div>
                <strong>Location :</strong> {profile.location}
              </div>

              <div>
                <strong>Profession :</strong> {profile.title}
              </div>

            </div>

            <a
              href={profile.resume}
              className="btn"
              download
            >
              Download Resume
            </a>

          </div>

        </div>

      </div>

    </section>

  );

}

export default About;