const Task = require("../models/Task");

class TaskController {
  async create(req, res) {
    const { title, description, statusTask } = req.body;

    try {
      const response = await Task.create({ title, description, statusTask });
      res.status(200).json({ message: "Criado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor", error });
    }
  }

  async getAll(req, res) {
    try {
      const response = await Task.findAll();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor", error });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
      const task = await Task.findByPk(id);

      if (!task) {
        return res.status(404).json({ message: "Task não encontrada" });
      }

      await task.update({
        title: title || task.title,
        description: description || task.description,
        status: status || task.status,
      });

      return res
        .status(200)
        .json({ message: "Task atualizada com sucesso", task });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao tentar atualizar a task", error });
    }
  }

  async delete(req, res) {
    const { id } = req.params; // Obtém o id da task pela URL

    try {
      // Tenta encontrar a task pelo ID
      const task = await Task.findByPk(id);

      // Verifica se a task existe
      if (!task) {
        return res.status(404).json({ message: "Task não encontrada" });
      }

      // Exclui a task
      await task.destroy();

      // Retorna uma resposta de sucesso
      return res.status(200).json({ message: "Task excluída com sucesso" });
    } catch (error) {
      // Retorna um erro caso ocorra algum problema
      return res
        .status(500)
        .json({ message: "Erro interno do servidor", error });
    }
  }
}

module.exports = TaskController;
