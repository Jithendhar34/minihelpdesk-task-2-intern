import React from "react";
import { useTickets } from "../context/TicketContext";

export default function StatusCheck() {
  const { tickets, updateStatus } = useTickets();

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Update Ticket Status</h2>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          padding: "20px",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <thead>
            <tr style={{ background: "#6200ea", color: "#fff" }}>
              <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Issue</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Change</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                  No tickets available
                </td>
              </tr>
            ) : (
              tickets.map((t, idx) => (
                <tr
                  key={t.id}
                  style={{
                    background: idx % 2 === 0 ? "#f9f9f9" : "#fff",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <td style={{ padding: "12px" }}>{t.name}</td>
                  <td style={{ padding: "12px" }}>{t.issue}</td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        color: "#fff",
                        backgroundColor:
                          t.status === "Open"
                            ? "#f44336"
                            : t.status === "In Progress"
                            ? "#ff9800"
                            : "#4caf50",
                        fontWeight: "bold",
                        fontSize: "13px",
                      }}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <select
                      value={t.status}
                      onChange={(e) => updateStatus(t.id, e.target.value)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "14px",
                        cursor: "pointer",
                        background: "#fff",
                      }}
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Closed</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
