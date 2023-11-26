import React, { useState, useEffect } from "react";
import "./restapi.scss";
import { IoMdSend } from "react-icons/io";
import Swal from "sweetalert2";

function Todo1() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data.todos))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const addTodo = () => {
    fetch("http://localhost:3001/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newTodoText }),
    })
      .then((response) => response.json())
      .then((data) => setTodos([...todos, data.todo]))
      .catch((error) => console.error("Error adding todo:", error));

    setNewTodoText("");
  };

  const handleDoubleClick = (todo) => {
    Swal.fire({
      title: "Edit or Delete Todo",
      input: "text",
      inputValue: todo.text,
      showCancelButton: true,
      showDenyButton: true,
      denyButtonText: "Delete",
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleModify(todo.id, result.value);
      } else if (result.isDenied) {
        handleDelete(todo.id);
      }
    });
  };

  const handleModify = (todoId, updatedText) => {
    fetch(`http://localhost:3001/api/todos/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: updatedText }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === todoId ? data.todo : todo))
        );
      })
      .catch((error) => console.error("Error modifying todo:", error));
  };

  const handleDelete = (todoId) => {
    fetch(`http://localhost:3001/api/todos/${todoId}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <div className="main1">
      <p className="a">Todo List - 1 </p>
      <p className="b">REST API</p>

      <div className="chat-container">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} onDoubleClick={() => handleDoubleClick(todo)}>
              {todo.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="ip-tab">
        <input
          type="text"
          placeholder="Enter the TODO Item"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
        />
        <span className="pnd"></span>
        <div className="btn">
          <IoMdSend onClick={addTodo} className="bt-icn" />
        </div>
      </div>
    </div>
  );
}

export default Todo1;
