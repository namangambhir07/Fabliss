import React from "react";
import { useParams, Link } from "react-router-dom";

const OrderSuccess = () => {
  const { orderId } = useParams();
  return (
    <div className="page-content container">
      <div className="order-success">
        <div className="check-circle">✓</div>
        <h1>Thank you, your order is confirmed!</h1>
        <p>We've received your order and will begin packing it with care shortly.</p>
        <div className="order-id-chip">Order ID: {orderId}</div>
        <div className="delivery-note" style={{ maxWidth: 460, margin: "0 auto 30px" }}>
          Shipped within 5-7 business days &middot; Delivery only within Delhi NCR &middot; No refund & return
        </div>
        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          <Link to="/" className="btn btn-primary">Continue Shopping</Link>
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Message Us on WhatsApp</a>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
