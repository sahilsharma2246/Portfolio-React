import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container nav-container">

        {/* Logo */}
        <Link to="/" className="logo">
          Portfolio
        </Link>

        {/* Navigation Links */}
        <nav className={menuOpen ? "nav-links active" : "nav-links"}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>

          <NavLink to="/skills" onClick={closeMenu}>
            Skills
          </NavLink>

          <NavLink to="/projects" onClick={closeMenu}>
            Projects
          </NavLink>

          <NavLink to="/certificates" onClick={closeMenu}>
            Certificates
          </NavLink>

          <NavLink to="/resume" onClick={closeMenu}>
            Resume
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>

          <NavLink to="/login" className="login-btn" onClick={closeMenu}>
            Login
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>
    </header>
  );
}

export default Navbar;