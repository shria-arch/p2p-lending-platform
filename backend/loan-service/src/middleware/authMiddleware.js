const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    try {
        // Debugging
        console.log("========== AUTH DEBUG ==========");
        console.log("Headers:", req.headers);
        console.log("Authorization Header:", req.headers.authorization);
        console.log("===============================");

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Access denied. No token provided."
            });
        }

        // Authorization should be:
        // Bearer eyJhbGciOiJIUzI1NiIs...
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token format is invalid."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        console.error("JWT Error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token."
        });
    }
};

module.exports = authenticateUser;