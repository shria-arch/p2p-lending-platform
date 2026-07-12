import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoans } from "../services/loanService";
import { createInvestment } from "../services/investmentService";

function InvestorDashboard() {
  const navigate = useNavigate();

  const [loans, setLoans] = useState([]);
  const [investmentAmounts, setInvestmentAmounts] = useState({});

  useEffect(() => {
    const loadLoans = async () => {
      try {
        const data = await getLoans();
        console.table(data);

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
    };

    loadLoans();
  }, []);

  const refreshLoans = async () => {
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
  };

  const handleAmountChange = (loanId, value) => {
    setInvestmentAmounts((prev) => ({
      ...prev,
      [loanId]: value,
    }));
  };

  const handleInvest = async (loanId) => {
    try {
      const amount = investmentAmounts[loanId];

      if (!amount || Number(amount) <= 0) {
        alert("Please enter a valid investment amount.");
        return;
      }

      const response = await createInvestment(
        loanId,
        Number(amount)
      );

      alert(response.message);

      setInvestmentAmounts((prev) => ({
        ...prev,
        [loanId]: "",
      }));

      await refreshLoans();
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Investment failed.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Investor Dashboard</h1>

      <h2>Available Loans</h2>

      {loans.length === 0 ? (
        <p>No loans available.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
          <thead>
  <tr>
    <th>Loan ID</th>
    <th>Borrower ID</th>
    <th>Total Amount</th>
    <th>Funded</th>
    <th>Remaining</th>
    <th>Progress</th>
    <th>Interest Rate</th>
    <th>Status</th>
    <th>Investment Amount</th>
    <th>Action</th>
  </tr>
</thead>

          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.borrower_id}</td>
               <td>₹{loan.amount}</td>
              <td>₹{loan.funded_amount}</td>
              <td>₹{loan.remaining_amount}</td>
              <td style={{ minWidth: "180px" }}>
  <div
    style={{
      width: "150px",
      backgroundColor: "#ddd",
      borderRadius: "10px",
      overflow: "hidden",
      display: "inline-block",
      marginRight: "10px",
      verticalAlign: "middle",
    }}
  >
    <div
      style={{
        width: `${Math.round(
          (Number(loan.funded_amount) / Number(loan.amount)) * 100
        )}%`,
        backgroundColor: "green",
        height: "20px",
      }}
    ></div>
  </div>

  {Math.round(
    (Number(loan.funded_amount) / Number(loan.amount)) * 100
  )}%
</td>
                <td>{loan.interest_rate}%</td>
                <td>
  {Number(loan.remaining_amount) === 0 ? (
    <span style={{ color: "green", fontWeight: "bold" }}>
      🟢 Funded
    </span>
  ) : Number(loan.funded_amount) > 0 ? (
    <span style={{ color: "blue", fontWeight: "bold" }}>
      🔵 Funding
    </span>
  ) : (
    <span style={{ color: "orange", fontWeight: "bold" }}>
      🟡 Pending
    </span>
  )}
</td>

                <td>
                  <input
                    type="number"
                    value={investmentAmounts[loan.id] || ""}
                    onChange={(e) =>
                      handleAmountChange(loan.id, e.target.value)
                    }
                  />
                </td>

                <td>
                  <button onClick={() => handleInvest(loan.id)}>
                    Invest
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br />

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default InvestorDashboard;