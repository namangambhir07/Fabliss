import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingBag, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const RAKHI_HAMPERS = [
  { slug: "snack-delight-hamper", name: "Snack Delight Hamper" },
  { slug: "rakhi-joy-gift-bag", name: "Rakhi Joy Gift Bag" },
  { slug: "golden-bond-rakhi-hamper", name: "Golden Bond Rakhi Hamper" },
  { slug: "sacred-bond-rakhi-box", name: "Sacred Bond Rakhi Box" },
  { slug: "royal-sibling-hamper", name: "Royal Sibling Hamper" },
  { slug: "rakhi-luxe-hamper", name: "Rakhi Luxe Hamper" },
];

const OTHER_HAMPERS = [
  { slug: "festive-special", name: "Festive Special Hamper" },
  { slug: "bridesmaid", name: "Bridesmaid Hamper" },
  { slug: "the-little-indulgence", name: "The Little Indulgence Hamper" },
  { slug: "coffee-therapy", name: "Coffee Therapy" },
  { slug: "housewarming", name: "Housewarming Hamper" },
  { slug: "baby-celebration", name: "Baby Girl Shower Hamper" },
  { slug: "baby-shower", name: "Baby Boy Shower Hamper" },
  { slug: "just-for-you", name: "Just for You Hamper" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [rakhiOpen, setRakhiOpen] = useState(false);
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const close = () => {
    setOpen(false);
    setShopOpen(false);
    setRakhiOpen(false);
  };

  return (
    <nav className="navbar" >
      <div className="container">
        <Link to="/" className="brand-wrap" onClick={close}>
          <span className="coz script">B'coz you are</span>
          <span className="brand">
            <span className="fab">Fab</span>
            <span className="liss">liss</span>
          </span>
        </Link>

        <div className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" onClick={close} className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>

          <div
            className="hamper-dropdown"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button className="link-btn" type="button" onClick={() => setShopOpen((value) => !value)}>
              Shop
            </button>
            <div className={`hamper-dropdown-menu ${shopOpen ? "open" : ""}`}>
              <div
                className="submenu-parent"
                onMouseEnter={() => setRakhiOpen(true)}
                onMouseLeave={() => setRakhiOpen(false)}
              >
                <button
                  className="dropdown-trigger"
                  type="button"
                  onClick={() => setRakhiOpen((value) => !value)}
                  aria-expanded={rakhiOpen}
                >
                  <span>Rakhi Collection</span>
                  <span className="submenu-arrow">❯</span>
                </button>
                <div className={`dropdown-submenu ${rakhiOpen ? "open" : ""}`}>
                  {RAKHI_HAMPERS.map((h) => (
                    <Link key={h.slug} to={`/hampers/${h.slug}`} onClick={close}>{h.name}</Link>
                  ))}
                </div>
              </div>

              {OTHER_HAMPERS.map((h) => (
                <Link key={h.slug} to={`/hampers/${h.slug}`} onClick={close}>{h.name}</Link>
              ))}
              <Link to="/customise" onClick={close} className="build-own-link">✦ Build Your Own Hamper</Link>
            </div>
          </div>
          <NavLink to="/customise" onClick={close} className={({ isActive }) => (isActive ? "active" : "")}>Customise</NavLink>
          <NavLink to="/bulk-orders" onClick={close} className={({ isActive }) => (isActive ? "active" : "")}>Bulk Orders</NavLink>
          <NavLink to="/about" onClick={close} className={({ isActive }) => (isActive ? "active" : "")}>About Us</NavLink>
          <NavLink to="/contact" onClick={close} className={({ isActive }) => (isActive ? "active" : "")}>Contact</NavLink>
        </div>

        <div className="nav-icons">
          {user ? (
            <div className="hamper-dropdown">
              <button className="icon-btn" title={user.name}><FaUserCircle /></button>
              <div className="hamper-dropdown-menu" style={{ minWidth: 170 }}>
                <span style={{ padding: "8px 14px", fontSize: "0.8rem", color: "var(--ink-soft)" }}>Hi, {user.name.split(" ")[0]}</span>
                <button className="link-btn" style={{ textAlign: "left", padding: "10px 14px" }} onClick={() => { logout(); navigate("/"); }}>Log out</button>
              </div>
            </div>
          ) : (
            <button className="icon-btn" onClick={() => navigate("/login")} title="Log in"><FaUserCircle /></button>
          )}
          <button className="icon-btn" onClick={() => navigate("/cart")} title="Cart">
            <FaShoppingBag />
            {count > 0 && <span className="cart-badge">{count}</span>}
          </button>
          <button className="mobile-toggle" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
