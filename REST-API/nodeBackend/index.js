// // rest-api-poc/server.js
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const PORT = 3001;

// app.use(bodyParser.json());
// app.use(cors());

// let todos = [];

// app.get("/api/todos", (req, res) => {
//   res.json({ todos });
// });

// app.post("/api/todos", (req, res) => {
//   const { text } = req.body;
//   const newTodo = { id: todos.length + 1, text };
//   todos.push(newTodo);
//   res.json({ todo: newTodo });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// rest-api-poc/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

let todos = [];

app.get("/api/todos", (req, res) => {
  res.json({ todos });
});

app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  const newTodo = { id: todos.length + 1, text };
  todos.push(newTodo);
  res.json({ todo: newTodo });
});

app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const todoIndex = todos.findIndex((todo) => todo.id == id);

  if (todoIndex !== -1) {
    todos[todoIndex].text = text;
    res.json({ todo: todos[todoIndex] });
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;

  todos = todos.filter((todo) => todo.id != id);

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
