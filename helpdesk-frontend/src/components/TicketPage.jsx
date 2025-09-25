import React, { useState } from "react";
import { useTickets } from "../context/TicketContext";

export default function TicketPage() {
  const { addTicket } = useTickets();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    orderDetails: "",
    issueDetails: "",
    issueType: "General",
    submitDate: new Date().toISOString().split("T")[0],
    priority: "Low",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTicket({
      id: Date.now(),
      name: `${form.firstName} ${form.lastName}`,
      issue: `${form.issueType}: ${form.issueDetails}`,
      priority: form.priority,
      status: "Open",
      createdAt: new Date().toLocaleString(),
    });
    alert("✅ Ticket submitted!");
    setForm({
      firstName: "",
      lastName: "",
      orderDetails: "",
      issueDetails: "",
      issueType: "General",
      submitDate: new Date().toISOString().split("T")[0],
      priority: "Low",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "700px",
        margin: "20px auto",
        padding: "25px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Raise a Ticket</h2>

      {[
        { label: "First Name", name: "firstName", type: "text" },
        { label: "Last Name", name: "lastName", type: "text" },
        { label: "Order Details", name: "orderDetails", type: "text" },
        { label: "Issue Details", name: "issueDetails", type: "text" },
        {
          label: "Issue Type",
          name: "issueType",
          type: "select",
          options: ["General", "Technical", "Billing", "Other"],
        },
        { label: "Date of Submitting Form", name: "submitDate", type: "date" },
      ].map((field) => (
        <div key={field.name} style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>{field.label}:</label>
          {field.type === "select" ? (
            <select
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              style={{ width: "100%", padding: "12px", fontSize: "16px" }}
            >
              {field.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "12px", fontSize: "16px" }}
            />
          )}
        </div>
      ))}

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Priority:</label>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          style={{ width: "100%", padding: "12px", fontSize: "16px" }}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "12px",
          background: "green",
          color: "#fff",
          fontSize: "16px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  );
}
