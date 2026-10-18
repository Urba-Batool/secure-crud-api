const express = require("express");

const router = express.Router();

const authenticate =
    require("../middleware/auth.middleware");

const authorize =
    require("../middleware/role.middleware");

const validate =
    require("../middleware/validation.middleware");

const {
    createStudentSchema,
    updateStudentSchema,
    studentIdSchema
} = require("../schemas/student.schema");

const {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require("../controllers/student.controller");


// GET ALL STUDENTS
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "USER"),
    getAllStudents
);


// GET STUDENT BY ID
router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "USER"),
    validate(studentIdSchema, "params"),
    getStudentById
);


// CREATE STUDENT
router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    validate(createStudentSchema),
    createStudent
);


// UPDATE STUDENT
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    validate(studentIdSchema, "params"),
    validate(updateStudentSchema),
    updateStudent
);


// DELETE STUDENT
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    validate(studentIdSchema, "params"),
    deleteStudent
);


module.exports = router;
