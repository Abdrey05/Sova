const { Task } = require('../db/models');

class TaskService {
  static async getAllTasks() {
    return await Task.findAll();
  }

  static async getTaskById(id) {
    return await Task.findByPk(id);
  }

  static async createTask(data) {
    return await Task.create(data);
  }

  static async updateTaskById(id, data) {
    const taskToUpdate = await Task.findByPk(id);

    if (!taskToUpdate) return null;

    const { title, text } = data;

    if (title) {
      taskToUpdate.title = title;
    }
    if (text) {
      taskToUpdate.text = text;
    }

    await taskToUpdate.save();

    return taskToUpdate;
  }

  static async deleteTaskById(id, userId) {
    const taskToDelete = await Task.findByPk(id);

    if (!taskToDelete) return null;

    if (taskToDelete.user_id !== userId) return null;

    return await taskToDelete.destroy();
  }
}

module.exports = TaskService;
