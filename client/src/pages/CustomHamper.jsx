// import React, { useEffect, useMemo, useState } from "react";
// import api from "../api/axios.js";
// import { useCart } from "../context/CartContext.jsx";

// const OCCASION_EMOJI = {
//   birthday: "🎂",
//   anniversary: "💍",
//   housewarming: "🏡",
//   baby: "🍼",
//   "just-because": "✨",
// };

// const BASE_PRICE = 199; // packaging + curation base charge for a custom hamper

// const CustomHamper = () => {
//   const { addItem } = useCart();

//   const [catalogue, setCatalogue] = useState({ occasions: [], items: [] });
//   const [loading, setLoading] = useState(true);
//   const [occasion, setOccasion] = useState(null);
//   const [selected, setSelected] = useState({}); // { itemId: true }
//   const [added, setAdded] = useState(false);

//   useEffect(() => {
//     api.get("/products/custom").then((res) => setCatalogue(res.data)).finally(() => setLoading(false));
//   }, []);

//   const toggleItem = (id) => {
//     setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
//     setAdded(false);
//   };

//   const chosenItems = useMemo(
//     () => catalogue.items.filter((it) => selected[it.id]),
//     [catalogue.items, selected]
//   );

//   const total = BASE_PRICE + chosenItems.reduce((sum, it) => sum + it.price, 0);

//   const handleAddToCart = () => {
//     if (!occasion || chosenItems.length === 0) return;

//     addItem({
//       id: `custom-${occasion}-${chosenItems.map((i) => i.id).join("-")}-${Date.now()}`,
//       name: `Custom Hamper — ${catalogue.occasions.find((o) => o.id === occasion)?.name || ""}`,
//       price: total,
//       image: chosenItems[0]?.image || catalogue.items[0]?.image,
//       qty: 1,
//       meta: chosenItems.map((i) => i.name).join(", "),
//     });
//     setAdded(true);
//   };

//   if (loading) return <div className="page-content container"><div className="loader-inline">Loading builder…</div></div>;

//   return (
//     <div className="page-content container">
//       <div className="page-title-band">
//         <span className="eyebrow">Build Your Own</span>
//         <h1>Design a hamper that's truly theirs</h1>
//       </div>

//       <div className="builder-steps">
//         <span className={`builder-step-pill ${!occasion ? "active" : ""}`}>1. Choose Occasion</span>
//         <span className={`builder-step-pill ${occasion ? "active" : ""}`}>2. Pick Items</span>
//       </div>

//       {!occasion ? (
//         <div className="occasion-grid">
//           {catalogue.occasions.map((o) => (
//             <div key={o.id} className="occasion-tile" onClick={() => setOccasion(o.id)}>
//               <span className="emoji">{OCCASION_EMOJI[o.id] || "🎁"}</span>
//               <div>{o.name}</div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="builder-layout">
//           <div>
//             <button className="btn btn-outline" style={{ marginBottom: 24 }} onClick={() => setOccasion(null)}>
//               ← Change Occasion
//             </button>
//             <h3 style={{ marginBottom: 18 }}>Check the items you'd like inside</h3>
//             <div className="item-picker-grid">
//               {catalogue.items.map((it) => (
//                 <div key={it.id} className={`item-pick-card ${selected[it.id] ? "checked" : ""}`} onClick={() => toggleItem(it.id)}>
//                   <span className="check-badge">✓</span>
//                   <img src={it.image} alt={it.name} loading="lazy" />
//                   <div className="info">
//                     <div className="name">{it.name}</div>
//                     <div className="price">₹{it.price}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="builder-summary">
//             <h3>Your Hamper</h3>
//             <div className="summary-line"><span>Occasion</span><span>{catalogue.occasions.find((o) => o.id === occasion)?.name}</span></div>
//             <div className="summary-line"><span>Base packaging & curation</span><span>₹{BASE_PRICE}</span></div>

//             {chosenItems.length === 0 ? (
//               <p className="empty-hint">Select items on the left — your price updates instantly here.</p>
//             ) : (
//               chosenItems.map((it) => (
//                 <div className="summary-line" key={it.id}><span>{it.name}</span><span>₹{it.price}</span></div>
//               ))
//             )}

//             <div className="summary-total"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>

//             <button className="btn btn-primary btn-full" disabled={chosenItems.length === 0} onClick={handleAddToCart}>
//               {added ? "Added to Cart ✓" : "Add Custom Hamper to Cart"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomHamper;

import React from "react";

const CustomHamper = () => {
  return (
    <div className="page-content container">
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "650px" }}>
          <div style={{ fontSize: "70px", marginBottom: "20px" }}>🎁</div>

          <h1>Custom Hampers Coming Soon!</h1>

          <p
            style={{
              margin: "20px 0",
              fontSize: "18px",
              color: "#666",
              lineHeight: "1.8",
            }}
          >
            We're working on an exciting feature that will let you design your own
            personalized hamper.
            <br />
            <br />
            Until then, if you'd like a custom hamper, simply contact us on
            WhatsApp and we'll create one specially for you.
          </p>

          <a
            href="https://wa.me/917607175551?text=Hi%20Fabliss!%20I%20want%20to%20create%20a%20custom%20hamper."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Contact us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default CustomHamper;