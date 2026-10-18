const pool = require("../config/database");

async function createStudent(data, userId) {
    const {
        name,
        email,
        age,
        department,
        semester
    } = data;

    const [result] = await pool.execute(
        `INSERT INTO students
        (name, email, age, department, semester, created_by)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            name,
            email,
            age,
            department,
            semester,
            userId
        ]
    );

    return result.insertId;
}


// GET ALL STUDENTS
async function getAllStudents(page = 1, limit = 10, search = "") {
    const offset = (page - 1) * limit;

    let query = `
        SELECT
            id,
            name,
            email,
            age,
            department,
            semester,
            created_by,
            created_at,
            updated_at
        FROM students
    `;

    const params = [];

    // Search filter
    if (search) {
        query += `
            WHERE name LIKE ?
               OR email LIKE ?
               OR department LIKE ?
        `;

        const searchValue = `%${search}%`;

        params.push(
            searchValue,
            searchValue,
            searchValue
        );
    }

    // Sorting
    query += ` ORDER BY id DESC`;

    // Pagination
    query += ` LIMIT ? OFFSET ?`;

    params.push(limit, offset);

    const [rows] = await pool.execute(
        query,
        params
    );

    return rows;
}


// GET STUDENT BY ID
async function getStudentById(id) {
    const [rows] = await pool.execute(
        `SELECT
            id,
            name,
            email,
            age,
            department,
            semester,
            created_by,
            created_at,
            updated_at
         FROM students
         WHERE id = ?`,
        [id]
    );

    return rows[0];
}


// UPDATE STUDENT
async function updateStudent(id, data) {
    const allowedFields = [
        "name",
        "email",
        "age",
        "department",
        "semester"
    ];

    const fields = allowedFields.filter((field) => data[field] !== undefined);
    const assignments = fields.map((field) => `${field} = ?`).join(", ");
    const values = fields.map((field) => data[field]);

    const [result] = await pool.execute(
        `UPDATE students
         SET ${assignments}
         WHERE id = ?`,
        [...values, id]
    );

    return result;
}


// DELETE STUDENT
async function deleteStudent(id) {
    const [result] = await pool.execute(
        "DELETE FROM students WHERE id = ?",
        [id]
    );

    return result;
}


// EXPORT ALL FUNCTIONS
module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};
