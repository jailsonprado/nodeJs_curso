const Task = require('../models/Task');

// Create
module.exports = class TaskController {
  static createTask(req, res) {
    res.render('tasks/create');
  }
  // Method Save
  static async createTaskSave(req, res) {
    const task = {
      title: req.body.title,
      description: req.body.description,
      done: false,
    };

    await Task.create(task);

    res.redirect('/tasks');
  }
  // Deletando
  static async removeTask(req, res) {
    const id = req.body.id;

    await Task.destroy({ where: { id: id } });

    res.redirect('/tasks');
  }
  // Resgatando dados
  static async showTasks(req, res) {
    const tasks = await Task.findAll({ raw: true });

    res.render('tasks/all', { tasks });
  }
};
