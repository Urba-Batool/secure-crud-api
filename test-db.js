console.log("Starting database test...");

const pool = require("./src/config/database");

async function testConnection() {
    console.log("Trying to connect...");

    try {
        const connection = await pool.getConnection();

        console.log("Database connected successfully!");

        connection.release();
    } catch (error) {
        console.error("Database connection failed!");
        console.error(error);
    } finally {
        await pool.end();
    }
}

testConnection();