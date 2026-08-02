import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import Seo, { SITE_URL, buildProductSchema } from "../components/Seo.jsx";

const HamperPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { requireAuth, user } = useAuth();

  const [hamper, setHamper] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setAdded(false);
    setQty(1);
    setActiveImg(0);
    api
      .get(`/products/hampers/${slug}`)
      .then((res) => setHamper(res.data))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="page-content container"><div className="loader-inline">Loading hamper…</div></div>;
  if (!hamper) return <div className="page-content container"><div className="loader-inline">Hamper not found.</div></div>;

  const discount = Math.round(((hamper.mrp - hamper.price) / hamper.mrp) * 100);

  const itemPayload = {
    id: `hamper-${hamper.slug}`,
    name: hamper.name,
    price: hamper.price,
    image: hamper.image,
    qty,
    meta: "Fixed Hamper",
  };

  const handleAddToCart = () => {
    addItem(itemPayload);
    setAdded(true);
  };

  const handleBuyNow = () => {
    if (user) {
      addItem(itemPayload);
      navigate("/checkout");
      return;
    }

    requireAuth({
      action: () => {
        addItem(itemPayload);
        navigate("/checkout");
      },
      redirectTo: "/checkout",
    });
  };

  const productSeo = {
    title: `${hamper.name} | Fabliss`,
    description: hamper.description,
    canonicalUrl: `${SITE_URL}/hampers/${hamper.slug}`,
    image: hamper.image || hamper.gallery?.[0] || `${SITE_URL}/fabliss-logo.png`,
    type: "product",
    jsonLd: buildProductSchema(hamper),
  };

  return (
    <div className="page-content container">
      <Seo
        title={productSeo.title}
        description={productSeo.description}
        canonicalUrl={productSeo.canonicalUrl}
        image={productSeo.image}
        type={productSeo.type}
        jsonLd={productSeo.jsonLd}
      />
      <div className="hamper-detail">
        <div>
          <div className="hamper-gallery-main">
            <img src={hamper.gallery[activeImg]} alt={hamper.name} />
          </div>
          <div className="hamper-gallery-thumbs">
            {hamper.gallery.map((g, i) => (
              <img key={i} src={g} className={i === activeImg ? "active" : ""} onClick={() => setActiveImg(i)} alt="" />
            ))}
          </div>
        </div>

        <div className="hamper-info">
          <span className="eyebrow">Occasion Hamper</span>
          <h1>{hamper.name}</h1>
          <div className="tagline script">{hamper.tagline}</div>
          <p>{hamper.description}</p>

          <div className="price-row">
            <span className="price">₹{hamper.price.toLocaleString("en-IN")}</span>
            <span className="mrp">₹{hamper.mrp.toLocaleString("en-IN")}</span>
            <span className="save-tag">{discount}% off</span>
          </div>

          <h3 style={{ fontSize: "1.1rem", marginTop: 26 }}>What's inside</h3>
          <ul className="included-list">
            {hamper.items.map((it, i) => <li key={i}>{it}</li>)}
          </ul>

          <div className="qty-row">
            <span className="eyebrow" style={{ margin: 0 }}>Quantity</span>
            <div className="qty-control">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>–</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
          </div>

          <div className="hamper-actions">
            <button className="btn btn-primary" onClick={handleAddToCart}>{added ? "Added ✓" : "Add to Cart"}</button>
            <button className="btn btn-dark" onClick={handleBuyNow}>Buy Now</button>
          </div>

          <div className="delivery-note">
            Prepaid Orders Only &middot; Shipped within 5-7 business days &middot; No refund
            & return &middot; Delivery only within Delhi NCR
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamperPage;
