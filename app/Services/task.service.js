const Task = require("../Models/task.model");

class TaskService {
  constructor(req) {
    this.userId = req.user.id;
  }

  async getAllTasks() {
    return await Task.find({ userId: this.userId });
  }

  async getTaskById(id) {
    return await Task.findOne({ _id: id, userId: this.userId });
  }

  async getTasksByStatus(status) {
    const query = { userId: this.userId };
    if (status) {
      query.status = status;
    }
    return await Task.find(query);
  }

  async createTask(data) {
    return await Task.create({ ...data, userId: this.userId });
  }

  async updateTask(id, updateData) {
    return await Task.findOneAndUpdate({ _id: id, userId: this.userId }, updateData, { new: true });
  }

  async deleteTask(id) {
    return await Task.findOneAndDelete({ _id: id, userId: this.userId });
  }
}

module.exports = (req) => new TaskService(req);
