const TaskService = require('../services/Task.service');
const formatResponse = require('../utils/formatResponse');

class TaskController {
  static async getAll(req, res) {
    try {
      const tasks = await TaskService.getAllTasks();

      if (!tasks || tasks.length === 0) {
        res.status(200).json(formatResponse(200, 'Задач нет', []));
        return;
      }

      return res
        .status(200)
        .json(formatResponse(200, 'Задачи получены', tasks));
    } catch (error) {
      console.log('====TaskController.getAll====', error);
      res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, error));
    }
  }

  static async getOne(req, res) {
    const { id } = req.params;

    if (isNaN(+id)) {
      res.status(400).json(formatResponse(400, 'Неверный формат ID'));
      return;
    }

    try {
      const task = await TaskService.getTaskById(id);

      if (!task) {
        res
          .status(404)
          .json(formatResponse(404, `Задача с id: ${id} не найдена`));
        return;
      }

      return res
        .status(200)
        .json(formatResponse(200, 'Данные о задаче получены', task));
    } catch (error) {
      console.log('====TaskController.getOne====', error);
      res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, error));
    }
  }

  static async createTask(req, res) {
    const { title, text } = req.body;

    const { user } = res.locals;
    console.log(user);

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      res
        .status(400)
        .json(formatResponse(400, 'Название задачи не может быть пустым'));
      return;
    }

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      res
        .status(400)
        .json(formatResponse(400, 'Описание задачи не может быть пустым'));
      return;
    }

    try {
      const newTask = await TaskService.createTask({
        title,
        text,
        user_id: user.id,
      });

      return res
        .status(201)
        .json(formatResponse(201, 'Задача создана успешно', newTask));
    } catch (error) {
      console.log('====TaskController.createTask====', error);
      res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, error));
    }
  }

  static async updateTask(req, res) {
    const { id } = req.params;

    if (isNaN(+id)) {
      res.status(400).json(formatResponse(400, 'Неверный формат ID'));
      return;
    }

    const { title, text } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      res
        .status(400)
        .json(formatResponse(400, 'Название задачи не может быть пустым'));
      return;
    }

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      res
        .status(400)
        .json(formatResponse(400, 'Описание задачи не может быть пустым'));
      return;
    }

    try {
      const updatedTask = await TaskService.updateTaskById(id, { title, text });

      if (!updatedTask) {
        res
          .status(404)
          .json(formatResponse(404, 'Задача для обновления не найдена'));
        return;
      }

      return res
        .status(200)
        .json(formatResponse(200, 'Данные задачи обновлены', updatedTask));
    } catch (error) {
      console.log('====TaskController.updateTask====', error);
      res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, error));
    }
  }

  static async deleteTask(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    if (isNaN(+id)) {
      res.status(400).json(formatResponse(400, 'Неверный формат ID'));
      return;
    }

    try {
      const deletedTask = await TaskService.deleteTaskById(id, user.id);
      if (!deletedTask) {
        res
          .status(404)
          .json(formatResponse(404, 'Задача для удаления не найдена'));
        return;
      }

      return res
        .status(200)
        .json(formatResponse(200, 'Задача успешно удалена'));
    } catch (error) {
      console.log('====TaskController.deleteTask====', error);
      res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, error));
    }
  }
}

module.exports = TaskController;
