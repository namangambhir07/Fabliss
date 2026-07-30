import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ hamper }) => {
  const discount = Math.round(((hamper.mrp - hamper.price) / hamper.mrp) * 100);
  return (
    <Link to={`/hampers/${hamper.slug}`} className="product-card">
      <div className="img-wrap">
        <span className="badge">{discount}% OFF</span>
        <img src={hamper.image} alt={hamper.name} loading="lazy" />
      </div>
      <div className="body">
        <h3>{hamper.name}</h3>
        <div className="tagline">{hamper.tagline}</div>
        <div className="price-row">
          <span className="price">₹{hamper.price.toLocaleString("en-IN")}</span>
          <span className="mrp">₹{hamper.mrp.toLocaleString("en-IN")}</span>
        </div>
        <span className="save">You save ₹{(hamper.mrp - hamper.price).toLocaleString("en-IN")}</span>
      </div>
    </Link>
  );
};

export default ProductCard;
