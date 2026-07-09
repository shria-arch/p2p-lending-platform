const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
        // Test database connection
        await pool.query("SELECT NOW()");
        console.log("✅ Connected to PostgreSQL");

        app.listen(PORT, () => {
            console.log(`Auth Service running on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Failed to connect to PostgreSQL");
        console.error(error.message);
    }
}

startServer();