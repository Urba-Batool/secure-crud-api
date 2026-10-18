const studentService = require("../services/student.service");


// CREATE STUDENT
async function createStudent(req, res, next) {
    try {
        const studentId = await studentService.createStudent(
            req.body,
            req.user.id
        );

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            data: {
                id: studentId
            }
        });

    } catch (error) {
        next(error);
    }
}


// GET ALL STUDENTS WITH PAGINATION
async function getAllStudents(req, res, next) {
    try {
        const page = Math.max(
            parseInt(req.query.page) || 1,
            1
        );

        const limit = Math.min(
            Math.max(
                parseInt(req.query.limit) || 10,
                1
            ),
            100
        );

        const search =
            typeof req.query.search === "string"
                ? req.query.search.trim()
                : "";

        const students = await studentService.getAllStudents(
            page,
            limit,
            search
        );

        res.status(200).json({
            success: true,
            page,
            limit,
            search,
            data: students
        });

    } catch (error) {
        next(error);
    }
}


// GET SINGLE STUDENT
async function getStudentById(req, res, next) {
    try {
        const student = await studentService.getStudentById(
            req.params.id
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });

    } catch (error) {
        next(error);
    }
}


// UPDATE STUDENT
async function updateStudent(req, res, next) {
    try {
        const result = await studentService.updateStudent(
            req.params.id,
            req.body
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student updated successfully"
        });

    } catch (error) {
        next(error);
    }
}


// DELETE STUDENT
async function deleteStudent(req, res, next) {
    try {
        const result = await studentService.deleteStudent(
            req.params.id
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });

    } catch (error) {
        next(error);
    }
}


// EXPORT CONTROLLERS
module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};