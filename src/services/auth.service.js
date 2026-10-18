const pool = require("../config/database");
const bcrypt = require("bcrypt");

async function findUserByEmail(email) {
    const [rows] = await pool.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows[0];
}

async function createUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const [result] = await pool.execute(
        `INSERT INTO users (name, email, password)
         VALUES (?, ?, ?)`,
        [name, email, hashedPassword]
    );

    return {
        id: result.insertId,
        name,
        email,
        role: "USER"
    };
}

module.exports = {
    findUserByEmail,
    createUser
};