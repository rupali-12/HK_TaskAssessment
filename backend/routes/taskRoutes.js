const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  exportUserAndTask,
} = require("../controller/taskController");

// Define routes for task CRUD operations
router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/exportuserandtask", exportUserAndTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
