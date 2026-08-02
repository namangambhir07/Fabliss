import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import ProductCard from "../components/ProductCard.jsx";
import Seo, {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_URL,
  buildItemListSchema,
  buildOrganizationSchema,
  buildWebsiteSchema,
} from "../components/Seo.jsx";
import homepageLogo from "../../assets/homepagelogo.jpeg";

const Home = () => {
  const [hampers, setHampers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/products/hampers")
      .then((res) => setHampers(res.data))
      .catch(() => setError("Could not load hampers right now. Please make sure the API server is running."))
      .finally(() => setLoading(false));
  }, []);

  const homeSchema = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildItemListSchema(hampers),
  ];

  return (
    <div className="page-content">
      <Seo
        title={DEFAULT_TITLE}
        description={DEFAULT_DESCRIPTION}
        canonicalUrl={SITE_URL}
        image={`${SITE_URL}/fabliss-logo.png`}
        type="website"
        jsonLd={homeSchema}
      />
      <section className="container hero">
        <div className="hero-copy">
          <span className="eyebrow">Delhi NCR &middot; Curated Gifting</span>
          <h1>
            Hampers made for<br /><span className="fab script">moments worth</span> remembering
          </h1>
          <p>
            Beautifully hand-packed hampers for every special moment from housewarmings and baby celebrations to bridesmaids, festivals, and coffee lovers. 
            Or build a custom hamper tailored to your taste. Delivered with care across Delhi NCR.
          </p>
          <div className="hero-cta">
            <Link to="/customise" className="btn btn-primary">Build Your Own Hamper</Link>
            <a href="#shop" className="btn btn-outline">Shop Hampers</a>
          </div>
        </div>
        <div className="hero-media">
          <div className="ring-frame">
            <img src={homepageLogo} alt="Fabliss gift hamper" />
          </div>
          <div className="floating-tag"><span className="dot" /> Freshly packed this week</div>
        </div>
      </section>

      <section className="container">
        <div className="trust-strip">
          <div className="trust-item"><div className="icon">💳</div><h4>Prepaid orders only</h4><p>Pay before it arrives</p></div>
          <div className="trust-item"><div className="icon">🚚</div><h4>5-7 Business Days</h4><p>Careful, timely dispatch</p></div>
          <div className="trust-item"><div className="icon">📍</div><h4>Delhi NCR Only</h4><p>Local, reliable delivery</p></div>
          <div className="trust-item"><div className="icon">🎀</div><h4>Hand-Packed</h4><p>Every hamper, with care</p></div>
        </div>
      </section>

      <section className="container section" id="shop">
        <div className="section-head">
          <span className="eyebrow">Our Hampers</span>
          <div className="divider-ribbon">✦</div>
          <h2>Occasions worth celebrating</h2>
          <p>Four signature hampers, each thoughtfully put together or start from scratch with your own.</p>
        </div>

        {loading && <div className="loader-inline">Loading hampers…</div>}
        {error && <div className="form-error-banner">{error}</div>}

        <div className="hamper-grid">
          
          {hampers.map((h) => (
            <ProductCard key={h.slug} hamper={h} />
          ))}
        </div>

        <div className="custom-cta-band">
          <div>
            <span className="eyebrow" style={{ color: "var(--rose-soft)" }}>Something Personal</span>
            <h2>Can't decide? Build your own hamper</h2>
            <p>Pick an occasion, choose exactly what goes inside, and watch the price update as you go.</p>
          </div>
          <Link to="/customise" className="btn btn-primary">Start Customising</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
