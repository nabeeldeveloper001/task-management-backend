const { z } = require("zod");

const validateRegister = z.object({
  email: z.string().email({ message: "Please enter valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

const validateLogin = z.object({
  email: z.string().email({ message: "Please enter valid email address" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

module.exports = { validateRegister, validateLogin };
