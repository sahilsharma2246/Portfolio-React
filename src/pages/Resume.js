import "./Resume.css";

function Resume() {
  return (
    <section className="resume">
      <div className="container">

        <div className="section-title">
          <h2>Resume</h2>
          <p>View or download my latest resume.</p>
        </div>

        <div className="resume-content">

          <div className="resume-card">

            <h3>Sahil Sharma</h3>

            <p>
              Full Stack Developer passionate about building responsive,
              scalable, and user-friendly web applications using the MERN
              Stack and Firebase.
            </p>

            <div className="resume-buttons">

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                View Resume
              </a>

              <a
                href="/resume.pdf"
                download
                className="btn btn-outline"
              >
                Download Resume
              </a>

            </div>

          </div>

          <div className="resume-preview">
            <iframe
              src="/resume.pdf"
              title="Resume"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Resume;