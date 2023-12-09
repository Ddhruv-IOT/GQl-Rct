const express = require("express");
const todosController = require("../controllers/controllers");

const router = express.Router();

router.get("/api/todos", todosController.getTodos);
router.post("/api/todos", todosController.createTodo);
router.put("/api/todos/:id", todosController.updateTodo);
router.delete("/api/todos/:id", todosController.deleteTodo);

module.exports = router;
