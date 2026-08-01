import "./About.css";

function About() {
  return (
    <section className="about">
      <div className="container">

        <div className="section-title">
          <h2>About Me</h2>
          <p>Get to know me better.</p>
        </div>

        <div className="about-content">

          <div className="about-image">
            <img
              src="https://via.placeholder.com/400"
              alt="Profile"
            />
          </div>

          <div className="about-text">
            <h3>Full Stack Developer</h3>

            <p>
              Hello! I'm <strong>Sahil Sharma</strong>, a passionate Full Stack
              Developer who enjoys building modern, responsive, and scalable web
              applications using React, Firebase, Node.js, Express, and MongoDB.
            </p>

            <p>
              I love learning new technologies and creating projects that solve
              real-world problems while improving my development skills.
            </p>

            <div className="about-info">
              <div>
                <strong>Name:</strong>
                <span> Sahil Sharma</span>
              </div>

              <div>
                <strong>Email:</strong>
                <span> your@email.com</span>
              </div>

              <div>
                <strong>Location:</strong>
                <span> Rohtak, Haryana</span>
              </div>

              <div>
                <strong>Experience:</strong>
                <span> Fresher</span>
              </div>
            </div>

            <a href="/resume.pdf" download className="btn">
              Download Resume
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;