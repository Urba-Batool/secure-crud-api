require("dotenv").config();

const bcrypt = require("bcrypt");
const pool = require("./config/database");

async function createAdmin() {
    try {
        const name = process.env.ADMIN_NAME;
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        if (!name || !email || !password) {
            throw new Error(
                "Set ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD before creating an admin"
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await pool.execute(
            `INSERT INTO users
            (name, email, password, role)
            VALUES (?, ?, ?, 'ADMIN')`,
            [name, email, hashedPassword]
        );

        console.log("Admin created successfully");

    } catch (error) {
        console.error(
            "Failed to create admin:",
            error.message
        );
    } finally {
        await pool.end();
    }
}

createAdmin();
