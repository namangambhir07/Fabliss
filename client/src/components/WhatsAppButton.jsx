import React from "react";
import { FaWhatsapp } from "react-icons/fa";

// TODO: replace with the real Fabliss WhatsApp Business number, digits only, country code first (e.g. 91XXXXXXXXXX)
const WHATSAPP_NUMBER = "917607175551";

const WhatsAppButton = ({ text = "Hi Fabliss! I'd like to know more about your hampers." }) => (
  <a
    className="whatsapp-fab"
    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Fabliss on WhatsApp"
    title="Chat on WhatsApp"
  >
    <FaWhatsapp />
  </a>
);

export default WhatsAppButton;
