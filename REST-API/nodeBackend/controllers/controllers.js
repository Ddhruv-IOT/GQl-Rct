const express = require("express");

let todos = [];

const getTodos = (req, res) => {
  res.json({ todos });
};

const createTodo = (req, res) => {
  const { text } = req.body;
  const newTodo = { id: todos.length + 1, text };
  todos.push(newTodo);
  res.json({ todo: newTodo });
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const todoIndex = todos.findIndex((todo) => todo.id == id);

  if (todoIndex !== -1) {
    todos[todoIndex].text = text;
    res.json({ todo: todos[todoIndex] });
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
};

const deleteTodo = (req, res) => {
  const { id } = req.params;

  todos = todos.filter((todo) => todo.id != id);

  res.json({ success: true });
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
