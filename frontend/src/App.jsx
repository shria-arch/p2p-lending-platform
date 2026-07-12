import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import BorrowerDashboard from "./pages/BorrowerDashboard";
import InvestorDashboard from "./pages/InvestorDashboard";
import CreateLoan from "./pages/CreateLoan";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/borrower" element={<BorrowerDashboard />} />
      <Route path="/investor" element={<InvestorDashboard />} />

      <Route path="/create-loan" element={<CreateLoan />} />
    </Routes>
  );
}

export default App;