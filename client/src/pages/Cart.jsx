import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Cart = () => {
  const { items, removeItem, updateQty, subtotal } = useCart();
  const { requireAuth } = useAuth();
  const navigate = useNavigate();
  const shipping = subtotal > 0 && subtotal < 1500 ? 99 : 0;

  const handleProceedToCheckout = () => {
    requireAuth({ redirectTo: "/checkout" });
  };

  if (items.length === 0) {
    return (
      <div className="page-content container">
        <div className="empty-cart">
          <div className="icon">🛍️</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added a hamper yet.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 20 }}>Shop Hampers</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content container">
      <div className="page-title-band" style={{ paddingBottom: 20 }}>
        <span className="eyebrow">Your Selection</span>
        <h1>Shopping Cart</h1>
      </div>

      <div className="cart-layout">
        <div>
          {items.map((item) => (
            <div className="cart-line" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <div className="title">{item.name}</div>
                {item.meta && <div className="sub">{item.meta}</div>}
                <div className="qty-control" style={{ marginTop: 10, width: "fit-content" }}>
                  <button onClick={() => updateQty(item.id, item.qty - 1)}>–</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
              <div className="line-total">₹{(item.price * item.qty).toLocaleString("en-IN")}</div>
            </div>
          ))}
        </div>

        <div className="builder-summary">
          <h3>Order Summary</h3>
          <div className="summary-line"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
          <div className="summary-line"><span>Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
          <div className="summary-total"><span>Total</span><span>₹{(subtotal + shipping).toLocaleString("en-IN")}</span></div>
          <button className="btn btn-primary btn-full" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
          <p style={{ fontSize: "0.78rem", textAlign: "center", marginTop: 14 }}>
            Delivery only within Delhi NCR &middot; No refund & return
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
