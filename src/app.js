require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const notFound = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

const authRoutes = require("./routes/auth.routes");
const studentRoutes =
    require("./routes/student.routes");
// JSON body parser
app.use(express.json({ limit: "10kb" }));

// Security headers
app.use(helmet());

// CORS configuration
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

// Rate limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
});

app.use("/api", apiLimiter);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/students", studentRoutes);

// Health check
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running"
    });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
