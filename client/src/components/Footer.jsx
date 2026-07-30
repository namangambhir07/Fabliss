import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div>
        <div className="brand" style={{ marginBottom: 16 }}>
          <span className="fab">Fab</span><span className="liss">liss</span>
        </div>
        <p>Thoughtfully curated gifting hampers, hand-packed with care and delivered across Delhi NCR.</p>
        <div className="socials">
          <a href="https://www.instagram.com/your_fabliss/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://wa.me/917607175551" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          <a href="mailto:hello@fabliss.in?subject=Hello%20from%20the%20website" aria-label="Email"><FaEnvelope /></a>
        </div>
      </div>

      <div>
        <h4>Hampers</h4>
        <ul>
          <li><Link to="/hampers/housewarming">Housewarming</Link></li>
          <li><Link to="/hampers/baby-celebration">Baby Celebration</Link></li>
          <li><Link to="/hampers/coffee-therapy">Coffee Therapy</Link></li>
          <li><Link to="/hampers/baby-shower">Baby Shower</Link></li>
          <li><Link to="/customise">Build Your Own</Link></li>
        </ul>
      </div>

      <div>
        <h4>Company</h4>
        <ul>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/bulk-orders">Bulk Orders</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/cart">My Cart</Link></li>
        </ul>
      </div>

      <div>
        <h4>Get in Touch</h4>
        <ul>
          <li style={{ flexDirection: "row", display: "flex", gap: 8, alignItems: "center" }}><FaMapMarkerAlt /> Delhi NCR, India</li>
          <li style={{ flexDirection: "row", display: "flex", gap: 8, alignItems: "center" }}><FaPhoneAlt /> +91 7607175551</li>
          <li style={{ flexDirection: "row", display: "flex", gap: 8, alignItems: "center" }}><FaEnvelope /> hello@fabliss.in</li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      &copy; {new Date().getFullYear()} Fabliss. All rights reserved. &nbsp;|&nbsp; Delivering only within Delhi NCR &nbsp;|&nbsp; No refund & return |&nbsp; Made with love by Naman Gambhir ❤️
    </div>
  </footer>
);

export default Footer;
