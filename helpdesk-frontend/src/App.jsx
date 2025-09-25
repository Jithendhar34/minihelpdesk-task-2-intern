import { TicketProvider } from "./context/TicketContext";
import { UserProvider } from "./context/UserContext";
import { Routes, Route } from "react-router-dom";
import HomeDashboard from "./components/HomeDashboard";
import Navbar from "./components/Navbar";
import TicketPage from "./components/TicketPage";
import StatusCheck from "./components/StatusCheck";
import Profile from "./components/Profile";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <UserProvider>
      <TicketProvider>
        <Navbar /> {/* Navbar placed here so it's always visible */}
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/ticket" element={<TicketPage />} />
          <Route path="/status" element={<StatusCheck />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </TicketProvider>
    </UserProvider>
  );
}

export default App;
