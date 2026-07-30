import React from "react";

const MESSAGES = [
  "Prepaid Orders Only",
  "Shipped within 5-7 business days",
  "No refund & return on gifting hampers",
  "Currently delivering only within Delhi NCR",
];

const TopBanner = () => (
  <div className="top-banner">
    <div className="track">
      {[...MESSAGES, ...MESSAGES].map((m, i) => (
        <span key={i}>{m}</span>
      ))}
    </div>
  </div>
);

export default TopBanner;
