import express from "express";
import Ticket from "../models/Ticket.js";

const router = express.Router();

// Get all tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new ticket
router.post("/", async (req, res) => {
  try {
    const { name, issue, priority } = req.body;
    const ticket = new Ticket({ name, issue, priority });
    await ticket.save();

    // Emit event to all connected clients
    req.io.emit("ticketCreated", ticket);

    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update ticket status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    // Emit event to all connected clients
    req.io.emit("ticketUpdated", ticket);

    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
