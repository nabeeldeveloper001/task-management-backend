const express = require("express");
const router = express.Router();

// Validation Schema
const { validateTask, validateStatus, validateTaskId } = require("../Validators/task.validation");
const { validateRegister, validateLogin } = require("../Validators/auth.validation");

// Middlewares
const validateRequest = require("../app/Middlewares/validateRequest");
const authMiddleware = require("../app/Middlewares/authMiddleware");

// Controllers
const taskController = require("../app/Controllers/task.controller");
const authController = require("../app/Controllers/auth.controller");

// Auth Routes
router.post("/register", validateRequest(validateRegister), authController.register);
router.post("/login", validateRequest(validateLogin), authController.login);

// Task Routes
router.get("/tasks", authMiddleware, taskController.getTasks);
router.get("/tasks/:id", authMiddleware, validateRequest(validateTaskId, "params"), taskController.getTask);
router.get("/filter-task/:status", authMiddleware, validateRequest(validateStatus, "params"), taskController.getTasksByStatus);
router.post("/tasks", authMiddleware, validateRequest(validateTask), taskController.createTask);
router.put("/tasks/:id", authMiddleware, taskController.updateTask);
router.delete("/tasks/:id", authMiddleware, validateRequest(validateTaskId, "params"), taskController.deleteTask);

module.exports = router;
