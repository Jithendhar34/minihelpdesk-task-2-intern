import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  // Fetch tickets from backend
  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tickets");
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTicket = async (ticket) => {
    try {
      const res = await axios.post("http://localhost:5000/api/tickets", ticket);
      setTickets(prev => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/tickets/${id}`, { status: newStatus });
      setTickets(prev => prev.map(t => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <TicketContext.Provider value={{ tickets, addTicket, updateStatus, fetchTickets }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => useContext(TicketContext);
