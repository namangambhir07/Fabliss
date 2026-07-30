import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import axios from "axios";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/contact",
        form
      );

      if (data.success) {
        setSent(true);

        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to send your message. Please try again."
      );
    }
  };

  return (
    <div className="page-content container">
      <div className="page-title-band">
        <span className="eyebrow">Get in Touch</span>
        <h1>We'd love to hear from you</h1>
      </div>

      <div className="contact-wrap">
        <div className="contact-info-card">
          <h3>Contact Details</h3>

          <div className="contact-info-row">
            <FaMapMarkerAlt className="icon" />
            <p>
              Delhi NCR, India
              <br />
              (Delivery within Delhi NCR only)
            </p>
          </div>

          <div className="contact-info-row">
            <FaPhoneAlt className="icon" />
            <a href="tel:+917607175551">+91 7607175551</a>
          </div>

          <div className="contact-info-row">
            <FaEnvelope className="icon" />
            <a href="mailto:hello@fabliss.in?subject=Hello%20from%20the%20website">
              hello@fabliss.in
            </a>
          </div>

          <div className="contact-info-row">
            <FaWhatsapp className="icon" />
            <a
              href="https://wa.me/917607175551"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="contact-form-card">
          <h3>Send us a message</h3>

          {sent && (
            <div className="form-success-banner">
              Thanks! Your inquiry has been received. We'll get back to you
              shortly.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-row-2">
              <div className="field">
                <label>Your Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>

              <div className="field">
                <label>Phone</label>
                <input
                  required
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div className="field">
              <label>Message</label>
              <textarea
                rows="4"
                required
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;