import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

export default function HomeDashboard() {
  const [tickets, setTickets] = useState([]);
  const { user } = useUser();

  // Fetch tickets from backend
  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tickets");
      // Sort by newest first
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTickets(sorted);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    }
  };

  useEffect(() => {
    fetchTickets(); // initial fetch
    const interval = setInterval(fetchTickets, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  const openCount = tickets.filter((t) => t.status === "Open").length;
  const inProgressCount = tickets.filter((t) => t.status === "In Progress").length;
  const closedCount = tickets.filter((t) => t.status === "Closed").length;

  return (
    <div style={{ display: "flex", gap: "20px", padding: "30px", minHeight: "100vh", background: "#f5f7fa" }}>
      {/* Profile */}
      <div style={{ width: "25%", background: "#fff", borderRadius: "12px", padding: "25px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
        <h3>{user.name || "Guest User"}</h3>
        <p>{user.phone || "No phone added"}</p>
        <p>{user.email || "No email added"}</p>
        <p>{user.address || "No address added"}</p>
      </div>

      {/* Tickets */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Summary */}
        <div style={{ display: "flex", gap: "20px" }}>
          <SummaryBox icon="📞" label="Open" value={openCount} color="#f44336" />
          <SummaryBox icon="⚙️" label="In Progress" value={inProgressCount} color="#ff9800" />
          <SummaryBox icon="✅" label="Closed" value={closedCount} color="#4caf50" />
        </div>

        {/* Table */}
        <div style={{ background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
          <h3>All Tickets</h3>
          <table width="100%" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f0f0f0", textAlign: "left" }}>
                <th style={{ padding: "12px" }}>Name</th>
                <th>Issue</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                    No tickets found
                  </td>
                </tr>
              ) : (
                tickets.map((t) => (
                  <tr key={t._id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px" }}>{t.name}</td>
                    <td>{t.issue}</td>
                    <td>{t.priority}</td>
                    <td><StatusBadge status={t.status} /></td>
                    <td>{new Date(t.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SummaryBox({ icon, label, value, color }) {
  return (
    <div style={{ flex: 1, background: "#fff", borderRadius: "12px", padding: "20px", display: "flex", alignItems: "center", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
      <div style={{ fontSize: "28px", backgroundColor: color, color: "#fff", borderRadius: "50%", width: "55px", height: "55px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "15px" }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: "15px", fontWeight: "bold" }}>{label}</div>
        <div style={{ fontSize: "18px" }}>{value}</div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let color = "#999";
  if (status === "Open") color = "#f44336";
  if (status === "In Progress") color = "#ff9800";
  if (status === "Closed") color = "#4caf50";
  return (
    <span style={{ padding: "6px 12px", borderRadius: "20px", color: "#fff", backgroundColor: color, fontWeight: "bold" }}>
      {status}
    </span>
  );
}
