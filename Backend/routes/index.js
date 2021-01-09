const express = require("express");
const router = express.Router();

const todoRoutes = require("./todoRoutes");

router.get("/todos", todoRoutes.getTodos);
router.get("/todo/:id", todoRoutes.authenticateToken, todoRoutes.getTodoById);
router.post("/todo", todoRoutes.addTodo);
router.patch("/todo/:id", todoRoutes.authenticateToken, todoRoutes.updateTodoById);
router.delete("/todo/:id", todoRoutes.authenticateToken, todoRoutes.deleteTodoById);

module.exports = router;