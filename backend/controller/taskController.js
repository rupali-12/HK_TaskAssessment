const Task = require("../model/Task");
const User = require("../model/User");
const ExcelJS = require("exceljs");

// Controller functions for handling task CRUD operations

// getalltask
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error in getting all tasks" });
  }
};

// createtask
exports.createTask = async (req, res) => {
  try {
    const { userId, taskName, taskType, status } = req.body;
    const newTask = new Task({ userId, taskName, taskType, status });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error in creating task" });
  }
};

// getTaskById
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error in getting task by Id" });
  }
};

// updatetask
exports.updateTask = async (req, res) => {
  try {
    const { userId, taskName, taskType, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { userId, taskName, taskType, status },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error in updating Task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting Task" });
  }
};

// export user and task
exports.exportUserAndTask = async (req, res) => {
  try {
    const users = await User.find();
    const tasks = await Task.find();
    // console.log("users--> ", users);
    // console.log("tasks--> ", tasks);

    const workbook = new ExcelJS.Workbook();
    const usersSheet = workbook.addWorksheet("Users");
    usersSheet.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Mobile", key: "mobile", width: 15 },
    ];
    users.forEach((user) => {
      usersSheet.addRow({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      });
    });

    const tasksSheet = workbook.addWorksheet("Tasks");
    tasksSheet.columns = [
      { header: "User ID", key: "userId", width: 10 },
      { header: "Task Name", key: "taskName", width: 30 },
      { header: "Task Type", key: "taskType", width: 15 },
      { header: "Status", key: "status", width: 15 },
    ];
    tasks.forEach((task) => {
      tasksSheet.addRow({
        userId: task.userId,
        taskName: task.taskName,
        taskType: task.taskType,
        status: task.status,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="users_and_tasks.xlsx"'
    );
    res.send(buffer);
  } catch (error) {
    console.error("Error exporting users and tasks:", error);
    res.status(500).json({ error: "Error exporting users and tasks" });
  }
};
