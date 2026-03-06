const prisma = require("../config/prisma");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required"
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.user.userId
      }
    });

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};


// GET TASKS
exports.getTasks = async (req, res) => {
  try {

    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.userId
      }
    });

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};


// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {

    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Invalid task ID"
      });
    }

    const { title, description, status } = req.body;

    const task = await prisma.task.findUnique({
      where: { id: Number(id) }
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    if (task.userId !== req.user.userId) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const allowedStatus = ["PENDING", "IN_PROGRESS", "COMPLETED"];

    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    if (!title && !description && !status) {
      return res.status(400).json({
        message: "Provide at least one field to update"
      });
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title: title ?? task.title,
        description: description ?? task.description,
        status: status ?? task.status
      }
    });

    res.status(200).json(updatedTask);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};


// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {

    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Invalid task ID"
      });
    }

    const task = await prisma.task.findUnique({
      where: { id: Number(id) }
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    if (task.userId !== req.user.userId) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    await prisma.task.delete({
      where: { id: Number(id) }
    });

    res.status(200).json({
      message: "Task deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};