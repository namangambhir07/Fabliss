import React, { useState } from "react";
import axios from "axios";

const BulkOrder = () => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    quantity: "",
    occasion: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/contact",
        {
          ...form,
          source: "Bulk Order",
        }
      );

      if (data.success) {
        setSent(true);

        setForm({
          name: "",
          company: "",
          phone: "",
          email: "",
          quantity: "",
          occasion: "",
          message: "",
        });
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to submit your enquiry. Please try again."
      );
    }
  };

  return (
    <div className="page-content container">
      <div className="bulk-hero">
        <span className="eyebrow">Corporate & Bulk Gifting</span>
        <h1>Make moments more memorable, at scale</h1>

        <p>
          Whether it's a corporate festive gifting drive, a wedding favour, or
          a celebration with a long guest list, we put together bulk hampers
          with the same care as a single gift, just multiplied. Tell us a little
          about your event and we'll get back with a curated proposal.
        </p>
      </div>

      <div className="bulk-perks">
        <div className="trust-item">
          <div className="icon">🎁</div>
          <h4>Custom Branding</h4>
          <p>Add your logo or a personal note</p>
        </div>

        <div className="trust-item">
          <div className="icon">📦</div>
          <h4>Flexible Quantities</h4>
          <p>From 10 to 100+ hampers</p>
        </div>

        <div className="trust-item">
          <div className="icon">🤝</div>
          <h4>Dedicated Support</h4>
          <p>One point of contact, start to finish</p>
        </div>
      </div>

      <div className="bulk-form-band">
        <h3 style={{ marginBottom: 8 }}>Get a Bulk Order Quote</h3>

        <p style={{ marginBottom: 24 }}>
          Share your requirements below and we'll reach out with pricing and
          timelines.
        </p>

        {sent && (
          <div className="form-success-banner">
            Thanks! Your bulk enquiry has been received. We'll get back to you
            shortly with pricing and timelines.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row-2">
            <div className="field">
              <label>Your Name</label>
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div className="field">
              <label>Company / Organisation (optional)</label>
              <input
                value={form.company}
                onChange={(e) =>
                  setForm({ ...form, company: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="field">
              <label>Phone</label>
              <input
                required
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="field">
              <label>Approx. Quantity</label>
              <input
                placeholder="e.g. 50 hampers"
                required
                value={form.quantity}
                onChange={(e) =>
                  setForm({ ...form, quantity: e.target.value })
                }
              />
            </div>

            <div className="field">
              <label>Occasion</label>
              <input
                placeholder="e.g. Diwali corporate gifting"
                required
                value={form.occasion}
                onChange={(e) =>
                  setForm({ ...form, occasion: e.target.value })
                }
              />
            </div>
          </div>

          <div className="field">
            <label>Tell us more</label>
            <textarea
              rows="4"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
            />
          </div>

          <button className="btn btn-primary btn-full">
            Send Enquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default BulkOrder;