import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaGift,
  FaUsers,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
  { name: "Orders", path: "/orders", icon: <FaBoxOpen /> },
  { name: "Products", path: "/products", icon: <FaGift /> },
  { name: "Customers", path: "/customers", icon: <FaUsers /> },
  { name: "Bulk Orders", path: "/bulk-orders", icon: <FaEnvelope /> },
  { name: "Settings", path: "/settings", icon: <FaCog /> },
];

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        background: "#fff",
        borderRight: "1px solid #e5e7eb",
        padding: "20px",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginBottom: "40px" }}>FABLISS</h2>

      {menu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 15px",
            marginBottom: "10px",
            borderRadius: "8px",
            textDecoration: "none",
            color: isActive ? "#fff" : "#333",
            background: isActive ? "#111827" : "transparent",
            fontWeight: 500,
          })}
        >
          {item.icon}
          {item.name}
        </NavLink>
      ))}

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          color: "#ef4444",
        }}
      >
        <FaSignOutAlt />
        Logout
      </div>
    </div>
  );
}

export default Sidebar;