import "./Projects.css";

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "A responsive portfolio website built using React and Firebase.",
    tech: ["React", "Firebase", "CSS"],
    image: "https://via.placeholder.com/500x300",
    github: "https://github.com/",
    demo: "https://example.com",
  },
  {
    id: 2,
    title: "Restaurant Website",
    description:
      "A full-stack restaurant management application using the MERN Stack.",
    tech: ["MongoDB", "Express", "React", "Node"],
    image: "https://via.placeholder.com/500x300",
    github: "https://github.com/",
    demo: "https://example.com",
  },
  {
    id: 3,
    title: "Expense Tracker",
    description:
      "Track daily expenses with charts and category management.",
    tech: ["React", "Firebase"],
    image: "https://via.placeholder.com/500x300",
    github: "https://github.com/",
    demo: "https://example.com",
  },
];

function Projects() {
  return (
    <section className="projects">
      <div className="container">

        <div className="section-title">
          <h2>My Projects</h2>
          <p>Some of my recent work.</p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id}>

              <img
                src={project.image}
                alt={project.title}
              />

              <div className="project-content">

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="tech-stack">
                  {project.tech.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </div>

                <div className="project-buttons">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                  >
                    GitHub
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline"
                  >
                    Live Demo
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Projects;