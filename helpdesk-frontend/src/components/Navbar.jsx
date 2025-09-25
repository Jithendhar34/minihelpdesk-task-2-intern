import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around", // evenly spaces all links
        padding: "15px 30px",
        backgroundColor: "#6a1b9a",
        color: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        fontSize: "18px",
        fontWeight: "bold",
      }}
    >
      {/* Navbar Links */}
      <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
        🏠 Home
      </Link>

      <Link to="/ticket" style={{ color: "#fff", textDecoration: "none" }}>
        🎫 Ticket
      </Link>

      <Link to="/status" style={{ color: "#fff", textDecoration: "none" }}>
        📊 Status
      </Link>

      <Link to="/profile" style={{ color: "#fff", textDecoration: "none" }}>
        👤 Profile
      </Link>
    </nav>
  );
}
