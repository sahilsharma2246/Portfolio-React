import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">

        <h2 className="footer-logo">Portfolio</h2>

        <p className="footer-text">
          Thank you for visiting my portfolio.
        </p>

        <div className="footer-icons">

          <a
            href="https://github.com/sahilsharma2246"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/sahil-sharma-251589358"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>

          <a href="mailto:sahilwsharma2246@gmail.com">
            <FaEnvelope />
          </a>

        </div>

        <p className="copyright">
          © {year} Sahil. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;