const pool = require("../config/db");

// ---------------------------
// Create Loan
// ---------------------------
const createLoan = async (req, res) => {
    try {
        // Borrower ID comes from JWT
        const borrower_id = req.user.id;

        const { amount, interest_rate } = req.body;

        // Validate input
        if (!amount || !interest_rate) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        // Insert loan into database
        const result = await pool.query(
            `INSERT INTO loans
            (borrower_id, amount, interest_rate)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [borrower_id, amount, interest_rate]
        );

        return res.status(201).json({
            message: "Loan created successfully.",
            loan: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// ---------------------------
// Get All Loans
// ---------------------------
const getAllLoans = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM loans ORDER BY created_at DESC"
        );

        return res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createLoan,
    getAllLoans
};