const taskServiceFactory = require("../Services/task.service");
const mongoose = require("mongoose");

const getTasks = async (req, res) => {
  try {
    const taskService = taskServiceFactory(req);
    const tasks = await taskService.getAllTasks();
    return res.status(200).json({ success: true, message: "All Task List!", tasks });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong!", error: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Task ID!" });
    }

    const taskService = taskServiceFactory(req);
    const task = await taskService.getTaskById(id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found!" });
    }
    return res.status(200).json({ success: true, message: "Task Detail!", detail: task });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong!", error: error.message });
  }
};

const getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const taskService = taskServiceFactory(req);
    const tasks = await taskService.getTasksByStatus(status);

    return res.status(200).json({ success: true, message: "Filtered Task List!", tasks });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong!", error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const taskService = taskServiceFactory(req);
    const newTask = await taskService.createTask(req.body);
    return res.status(201).json({ success: true, message: "Task created successfully!", task: newTask });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong!", error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskService = taskServiceFactory(req);
    const updatedTask = await taskService.updateTask(req.params.id, req.body);
    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found!" });
    }
    return res.status(200).json({ success: true, message: "Task updated successfully!", task: updatedTask });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong!", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskService = taskServiceFactory(req);
    const deletedTask = await taskService.deleteTask(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task not found!" });
    }
    return res.status(200).json({ success: true, message: "Task deleted successfully!", task: deletedTask });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong!", error: error.message });
  }
};

module.exports = {
  getTasks,
  getTask,
  getTasksByStatus,
  createTask,
  updateTask,
  deleteTask,
};
