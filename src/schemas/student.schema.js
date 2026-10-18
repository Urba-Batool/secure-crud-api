const { z } = require("zod");

const createStudentSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2)
        .max(100),

    email: z
        .string()
        .trim()
        .email(),

    age: z
        .number()
        .int()
        .min(16)
        .max(100),

    department: z
        .string()
        .trim()
        .min(2)
        .max(100),

    semester: z
        .number()
        .int()
        .min(1)
        .max(8)
});

const updateStudentSchema = createStudentSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field is required"
    });

const studentIdSchema = z.object({
    id: z.coerce.number().int().positive()
});

module.exports = {
    createStudentSchema,
    updateStudentSchema,
    studentIdSchema
};
