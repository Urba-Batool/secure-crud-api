const express = require("express");

const router = express.Router();

const {
    register,
    login
} = require("../controllers/auth.controller");

const validate = require("../middleware/validation.middleware");
const rateLimit = require("express-rate-limit");

const {
    registerSchema,
    loginSchema
} = require("../schemas/auth.schema");

router.post(
    "/register",
    validate(registerSchema),
    register
);

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        message: "Too many login attempts. Try again later."
    }
});
router.post(
    "/login",
    loginLimiter,
    validate(loginSchema),
    login
);

module.exports = router;
