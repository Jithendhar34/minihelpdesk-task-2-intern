import React, { useState } from "react";
import { useUser } from "../context/UserContext";

export default function Profile() {
  const { user, updateUser } = useUser();
  const [form, setForm] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(form);
    alert("✅ Profile updated");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <strong>Name:</strong>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <strong>Email:</strong>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <strong>Phone:</strong>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <strong>Address:</strong>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </p>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
