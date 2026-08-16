import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoans } from "../services/loanService";

function BorrowerDashboard() {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    async function fetchLoans() {
      try {
        const data = await getLoans();

        if (Array.isArray(data)) {
          setLoans(data);
        } else if (Array.isArray(data.loans)) {
          setLoans(data.loans);
        } else {
          setLoans([]);
        }
      } catch (error) {
        console.error("Error loading loans:", error);
      }
    }

    fetchLoans();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Borrower Dashboard</h1>

      <button
        onClick={() => navigate("/create-loan")}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        Create Loan
      </button>

      <hr />

      <h2>All Loans</h2>

      {loans.length === 0 ? (
        <p>No loans found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
  borderCollapse: "collapse",
  margin: "20px auto",
  minWidth: "700px",
}}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Interest Rate</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.amount}</td>
                <td>{loan.interest_rate}%</td>
                <td>{loan.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr />

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default BorrowerDashboard;