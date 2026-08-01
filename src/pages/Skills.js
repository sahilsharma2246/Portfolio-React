import "./Skills.css";

const skills = [
  { name: "HTML5", level: "95%" },
  { name: "CSS3", level: "90%" },
  { name: "JavaScript", level: "85%" },
  { name: "React.js", level: "90%" },
  { name: "Firebase", level: "85%" },
  { name: "Node.js", level: "80%" },
  { name: "Express.js", level: "80%" },
  { name: "MongoDB", level: "75%" },
];

function Skills() {
  return (
    <section className="skills">
      <div className="container">

        <div className="section-title">
          <h2>My Skills</h2>
          <p>Technologies I use to build modern web applications.</p>
        </div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div className="skill-card" key={index}>

              <div className="skill-header">
                <h3>{skill.name}</h3>
                <span>{skill.level}</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: skill.level }}
                ></div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;