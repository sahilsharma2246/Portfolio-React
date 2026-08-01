import "./Certificates.css";

const certificates = [
  {
    id: 1,
    title: "Full Stack Development",
    issuer: "Udemy",
    image: "https://via.placeholder.com/500x300",
    link: "#",
  },
  {
    id: 2,
    title: "React.js Certificate",
    issuer: "Code Pulse",
    image: "https://via.placeholder.com/500x300",
    link: "#",
  },
  {
    id: 3,
    title: "Network Bulls Training",
    issuer: "Network Bulls",
    image: "https://via.placeholder.com/500x300",
    link: "#",
  },
  {
    id: 4,
    title: "AI Workshop",
    issuer: "College",
    image: "https://via.placeholder.com/500x300",
    link: "#",
  },
];

function Certificates() {
  return (
    <section className="certificates">
      <div className="container">

        <div className="section-title">
          <h2>Certificates</h2>
          <p>My certifications and achievements.</p>
        </div>

        <div className="certificate-grid">

          {certificates.map((certificate) => (
            <div className="certificate-card" key={certificate.id}>

              <img
                src={certificate.image}
                alt={certificate.title}
              />

              <div className="certificate-content">

                <h3>{certificate.title}</h3>

                <p>{certificate.issuer}</p>

                <a
                  href={certificate.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                >
                  View Certificate
                </a>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Certificates;