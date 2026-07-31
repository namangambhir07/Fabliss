import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axios.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
const NCR_PIN_PREFIXES = ["11", "122", "201", "121", "124", "130", "131"];
const isNcrPincode = (p) => /^\d{6}$/.test(p) && NCR_PIN_PREFIXES.some((pre) => p.startsWith(pre));

// Loads the Razorpay checkout.js script once, on demand.
const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // const shipping = subtotal > 0 && subtotal < 1500 ? 99 : 0;
  const shipping = 0;
  const total = subtotal + shipping;

  const [address, setAddress] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    addressLine: "",
    city: "",
    state: "Delhi",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [placing, setPlacing] = useState(false);

  const validate = () => {
    const e = {};
    if (!address.fullName.trim()) e.fullName = "Required";
    if (!PHONE_RE.test(address.phone)) e.phone = "Enter a valid 10-digit mobile number";
    if (!EMAIL_RE.test(address.email)) e.email = "Enter a valid email address";
    if (!address.addressLine.trim()) e.addressLine = "Required";
    if (!address.city.trim()) e.city = "Required";
    if (!isNcrPincode(address.pincode)) e.pincode = "We currently deliver only within Delhi NCR pincodes";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = async ({ razorpayOrderId, razorpayPaymentId } = {}) => {
    const { data } = await api.post("/orders/place", {
      items,
      customHamper: items.some((i) => i.id.startsWith("custom-")),
      subtotal,
      shipping,
      total,
      shippingAddress: address,
      paymentMethod,
      razorpayOrderId,
      razorpayPaymentId,
    });
    clearCart();
    navigate(`/order-success/${data.orderId}`);
  };

  const handleRazorpayPay = async () => {
    const ok = await loadRazorpayScript();
    if (!ok) {
      setServerError("Could not load Razorpay. Check your connection and try again.");
      return;
    }

    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!keyId) {
      setServerError("Razorpay is not configured for this app yet.");
      return;
    }

    try {
      const { data: order } = await api.post("/orders/razorpay/create", { amount: Math.round(total * 100) });

      const rzp = new window.Razorpay({
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Fabliss",
        description: "Gifting Hamper Order",
        order_id: order.id,
        prefill: { name: address.fullName, email: address.email, contact: address.phone },
        theme: { color: "#c97c87" },
        handler: async (response) => {
          try {
            await api.post("/orders/razorpay/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            await placeOrder({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
            });
          } catch (err) {
            setServerError(err.response?.data?.message || "Payment verification failed. If money was deducted, it will be refunded.");
          }
        },
        modal: {
          ondismiss: () => {
            setPlacing(false);
            setServerError("Payment was cancelled. Your order was not placed.");
          },
        },
      });
      rzp.open();
    } catch (err) {
      setServerError(err.response?.data?.message || "Could not start Razorpay checkout.");
      setPlacing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;
    setPlacing(true);
    try {
      if (paymentMethod === "razorpay") {
        await handleRazorpayPay();
      } else {
        await placeOrder();
      }
    } catch (err) {
      setServerError(err.response?.data?.message || "Could not place your order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="page-content container">
        <div className="empty-cart"><h2>Your cart is empty</h2></div>
      </div>
    );
  }

  return (
    <div className="page-content container">
      <div className="page-title-band" style={{ paddingBottom: 20 }}>
        <span className="eyebrow">Almost There</span>
        <h1>Checkout</h1>
      </div>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div>
          {serverError && <div className="form-error-banner">{serverError}</div>}

          <div className="checkout-card">
            <h3>Delivery Address</h3>
            <div className="form-row-2">
              <div className="field">
                <label>Full Name</label>
                <input value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} />
                {errors.fullName && <div className="field-error">{errors.fullName}</div>}
              </div>
              <div className="field">
                <label>Phone Number</label>
                <input value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
                {errors.phone && <div className="field-error">{errors.phone}</div>}
              </div>
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })} />
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>
            <div className="field">
              <label>Address</label>
              <textarea rows="2" value={address.addressLine} onChange={(e) => setAddress({ ...address, addressLine: e.target.value })} />
              {errors.addressLine && <div className="field-error">{errors.addressLine}</div>}
            </div>
            <div className="form-row-2">
              <div className="field">
                <label>City</label>
                <input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                {errors.city && <div className="field-error">{errors.city}</div>}
              </div>
              <div className="field">
                <label>Pincode</label>
                <input value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
                {errors.pincode && <div className="field-error">{errors.pincode}</div>}
              </div>
            </div>
          </div>

          <div className="checkout-card">
            <h3>Payment Method</h3>
            <div className={`payment-option ${paymentMethod === "cod" ? "selected" : ""}`} onClick={() => setPaymentMethod("cod")}>
              <input type="radio" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
              <div>
                <div className="label">Cash on Delivery</div>
                <div className="sub">Pay in cash when your hamper arrives</div>
              </div>
            </div>
            <div className={`payment-option ${paymentMethod === "razorpay" ? "selected" : ""}`} onClick={() => setPaymentMethod("razorpay")}>
              <input type="radio" checked={paymentMethod === "razorpay"} onChange={() => setPaymentMethod("razorpay")} />
              <div>
                <div className="label">Pay Online</div>
                <div className="sub">UPI, cards & netbanking via Razorpay</div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-summary-box">
          <h3>Order Summary</h3>
          {items.map((i) => (
            <div className="mini-cart-item" key={i.id}><span>{i.name} × {i.qty}</span><span>₹{(i.price * i.qty).toLocaleString("en-IN")}</span></div>
          ))}
          <div className="summary-line"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
          <div className="summary-line"><span>Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
          <div className="summary-total"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
          <button className="btn btn-primary btn-full" disabled={placing}>
            {placing ? "Processing…" : paymentMethod === "razorpay" ? "Pay & Place Order" : "Place Order"}
          </button>
          <p style={{ fontSize: "0.75rem", marginTop: 14, color: "#d8cdca" }}>
            By placing this order you agree: no refund or return, 5-7 business day shipping,
            delivery only within Delhi NCR.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
