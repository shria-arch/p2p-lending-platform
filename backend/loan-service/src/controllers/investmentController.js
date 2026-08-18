const pool = require("../config/db");

// ---------------------------
// Invest in a Loan
// ---------------------------
const investInLoan = async (req, res) => {
  const client = await pool.connect();

  try {
    const loan_id = req.params.id;
    const investor_id = req.user.id;
    const { amount_funded } = req.body;

    const investmentAmount = Number(amount_funded);

    // Validate input
    if (!amount_funded || investmentAmount <= 0) {
      return res.status(400).json({
        message: "Please enter a valid investment amount.",
      });
    }

    await client.query("BEGIN");

    // Lock the loan row while funding it
    const loanResult = await client.query(
      `SELECT id, amount, funded_amount, remaining_amount, status
       FROM loans
       WHERE id = $1
       FOR UPDATE`,
      [loan_id]
    );

    if (loanResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Loan not found.",
      });
    }

    const loan = loanResult.rows[0];

    const remainingAmount = Number(loan.remaining_amount);
    const fundedAmount = Number(loan.funded_amount);

    if (remainingAmount <= 0) {
      await client.query("ROLLBACK");

      return res.status(400).json({
        message: "This loan is already fully funded.",
      });
    }

    if (investmentAmount > remainingAmount) {
      await client.query("ROLLBACK");

      return res.status(400).json({
        message: `Investment cannot exceed the remaining amount of ₹${remainingAmount}.`,
      });
    }

    const newFundedAmount = fundedAmount + investmentAmount;
    const newRemainingAmount = remainingAmount - investmentAmount;

    const newStatus =
      newRemainingAmount === 0 ? "Active" : "Funding";

    // Create investment record
    const investmentResult = await client.query(
      `INSERT INTO investments
       (loan_id, investor_id, amount_funded)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [loan_id, investor_id, investmentAmount]
    );

    // Update loan
    const updatedLoan = await client.query(
      `UPDATE loans
       SET funded_amount = $1,
           remaining_amount = $2,
           status = $3
       WHERE id = $4
       RETURNING *`,
      [
        newFundedAmount,
        newRemainingAmount,
        newStatus,
        loan_id,
      ]
    );

    await client.query("COMMIT");

    return res.status(201).json({
      message: "Investment successful.",
      investment: investmentResult.rows[0],
      loan: updatedLoan.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Investment error:", error);

    return res.status(500).json({
      message: "Investment failed.",
    });
  } finally {
    client.release();
  }
};

module.exports = {
  investInLoan,
};