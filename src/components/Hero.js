/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import firedb from "../Firebase";
import "./Hero.css";

function Hero() {
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
    <section className="hero">
      <div className="container hero-container">

        {/* Left Content */}
        <div className="hero-content">

          <h3>Hello, I'm</h3>

          <h1>{profile.name}</h1>

          <h2>{profile.title}</h2>

          <p>{profile.about}</p>

          <div className="hero-buttons">

            <a
              href={profile.resume}
              download
              className="btn"
            >
              Download Resume
            </a>

            <Link to="/contact" className="btn btn-outline">
              Contact Me
            </Link>

          </div>

          <div className="hero-social">

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>

            <a href={`mailto:${profile.email}`}>
              <FaEnvelope />
            </a>

          </div>

        </div>

        {/* Right Image */}

        <div className="hero-image">

          <img
            src={profile.image}
            alt={profile.name}
          />

        </div>

      </div>
    </section>
  );
}

export default Hero;