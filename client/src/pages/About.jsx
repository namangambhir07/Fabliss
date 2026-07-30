import React from "react";
import aboutimg from "../../assets/About us.jpeg";

const About = () => (
  <div className="page-content container">
    <div className="about-hero">
      <div className="ring-frame">
        <img src={aboutimg} alt="Fabliss hamper packing" />
      </div>
      <div>
        <span className="eyebrow">Our Story</span>
        <h1>B'coz you are <span className="script fab">Fabliss</span></h1>
        <p>We believe the best gifts aren’t just things they’re little moments of happiness, thoughtfully put together.</p>
        <p>
          Fabliss began with a simple idea: to make gifting more fun, personal and effortlessly special. 
          What started with a love for discovering quirky, beautiful and unexpected finds has grown into a space where
          every gift is carefully curated to make someone feel truly celebrated.
        </p>
        <p>
          From little surprises to thoughtfully crafted hampers for every occasion, we bring together things that
          make people smile, moments that deserve to be remembered, and gifts that feel just a little more you.
        </p>
        <p>Whether it’s a birthday, a festival, a new beginning, a celebration or simply a special moment, we’re 
           here to help you find something fabulous.
        </p>
        <p>Because every occasion deserves a little Fabliss. ♡</p>
      </div>
    </div>

    <div className="section-head">
      <span className="eyebrow">What We Stand For</span>
      <h2>The Fabliss promise</h2>
    </div>
    <div className="values-grid">
      <div className="value-card">
        <span className="num">01</span>
        <h3>Hand-Packed, Always</h3>
        <p>No assembly lines every hamper is packed and checked by hand before it leaves us.</p>
      </div>
      <div className="value-card">
        <span className="num">02</span>
        <h3>Local & Reliable</h3>
        <p>We deliver only within Delhi NCR so we can keep quality and timelines consistent.</p>
      </div>
      <div className="value-card">
        <span className="num">03</span>
        <h3>Made Yours</h3>
        <p>Our custom hamper builder means you're never stuck with a one-size-fits-all gift.</p>
      </div>
    </div>
  </div>
);

export default About;
