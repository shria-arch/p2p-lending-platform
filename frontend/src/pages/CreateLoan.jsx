import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLoan } from "../services/loanService";

function CreateLoan() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createLoan(amount, interestRate);

      alert(data.message);

      navigate("/borrower");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Failed to create loan."
      );
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Create Loan</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Loan Amount</label>
          <br />

          <input
            type="number"
            placeholder="Enter loan amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "300px",
              padding: "10px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Interest Rate (%)</label>
          <br />

          <input
            type="number"
            step="0.01"
            placeholder="Enter interest rate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            style={{
              width: "300px",
              padding: "10px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Submit Loan
        </button>
      </form>
    </div>
  );
}

export default CreateLoan;