import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Firebase integration will be added in the next step.");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="contact">
      <div className="container">

        <div className="section-title">
          <h2>Contact Me</h2>
          <p>Let's discuss your next project.</p>
        </div>

        <div className="contact-container">

          <div className="contact-info">
            <h3>Get In Touch</h3>

            <p>
              Feel free to contact me for freelance work,
              internships or collaboration.
            </p>

            <div className="info">
              <strong>Email</strong>
              <span>your@email.com</span>
            </div>

            <div className="info">
              <strong>Phone</strong>
              <span>+91 9876543210</span>
            </div>

            <div className="info">
              <strong>Location</strong>
              <span>Rohtak, Haryana</span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="btn">
              Send Message
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

export default Contact;