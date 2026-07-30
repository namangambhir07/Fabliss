import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f6fa" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <main style={{ padding: "24px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;