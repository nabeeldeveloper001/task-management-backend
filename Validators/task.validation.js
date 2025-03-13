const { z } = require("zod");

const validateTask = z.object({
  title: z.string({ required_error: "Title is required" }).min(1, {
    message: "Title is required",
  }),
  description: z.string({ required_error: "Description is required" }).min(1, {
    message: "Description is required",
  }),
  status: z.enum(["pending", "completed"]).optional(),
});

const validateStatus = z.object({
  status: z.enum(["pending", "completed"], {
    message: "Status must be either 'pending' or 'completed'",
  }),
});

const validateTaskId = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid Task ID" }),
});

module.exports = { validateTask, validateStatus, validateTaskId };
