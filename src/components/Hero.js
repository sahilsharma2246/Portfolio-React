import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">

        {/* Left Content */}
        <div className="hero-content">

          <h3>Hello, I'm</h3>

          <h1>Sahil Sharma</h1>

          <h2>Full Stack Developer</h2>

          <p>
            I build responsive, user-friendly web applications using
            React, Firebase, Node.js, Express, and MongoDB.
          </p>

          <div className="hero-buttons">
            <a
              href="/resume.pdf"
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
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>

            <a href="mailto:example@gmail.com">
              <FaEnvelope />
            </a>

          </div>

        </div>

        {/* Right Image */}
        <div className="hero-image">
          <img
            src="https://via.placeholder.com/350"
            alt="Profile"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;