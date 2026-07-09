const pool = require("../config/db");

// ---------------------------
// Invest in a Loan
// ---------------------------
const investInLoan = async (req, res) => {
    try {
        const loan_id = req.params.id;
        const investor_id = req.user.id;
        const { amount_funded } = req.body;

        // Validate input
        if (!amount_funded) {
            return res.status(400).json({
                message: "Investment amount is required."
            });
        }

        // Check if loan exists
        const loan = await pool.query(
            "SELECT * FROM loans WHERE id = $1",
            [loan_id]
        );

        if (loan.rows.length === 0) {
            return res.status(404).json({
                message: "Loan not found."
            });
        }

        // Insert investment
        const result = await pool.query(
            `INSERT INTO investments
            (loan_id, investor_id, amount_funded)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [loan_id, investor_id, amount_funded]
        );

        return res.status(201).json({
            message: "Investment successful.",
            investment: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    investInLoan
};