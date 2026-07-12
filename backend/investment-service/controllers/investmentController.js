const pool = require("../config/db");

// Create Investment
const createInvestment = async (req, res) => {
  try {
    const { loan_id, investor_id, amount_funded } = req.body;

    // Create investment
    const investmentResult = await pool.query(
      `INSERT INTO investments (loan_id, investor_id, amount_funded)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [loan_id, investor_id, amount_funded]
    );

    // Update loan funding
    const loanResult = await pool.query(
      `
      UPDATE loans
      SET
        funded_amount = funded_amount + $1,
        remaining_amount = remaining_amount - $1
      WHERE id = $2
      RETURNING *
      `,
      [amount_funded, loan_id]
    );

    const updatedLoan = loanResult.rows[0];

    // Update loan status if fully funded
    if (Number(updatedLoan.remaining_amount) <= 0) {
      await pool.query(
        `
        UPDATE loans
        SET status = 'Funded',
            remaining_amount = 0
        WHERE id = $1
        `,
        [loan_id]
      );
    }

    res.status(201).json({
      message: "Investment successful.",
      investment: investmentResult.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get My Investments
const getMyInvestments = async (req, res) => {
  try {
    const { investor_id } = req.query;

    const result = await pool.query(
      `
     SELECT *
FROM investments
WHERE investor_id = $1
ORDER BY created_at DESC
      `,
      [investor_id]
    );

    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createInvestment,
  getMyInvestments,
};