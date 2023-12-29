import { useState, useEffect, react } from "react";
import Swal from "sweetalert2";
import config from "../../../constants/constants";

export function Todo1Logic() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");

  // Fetch the ToDo data for the first time
  useEffect(() => {
    fetch(config.REST_BACKEND_GET_URL)
      .then((response) => response.json())
      .then((data) => setTodos(data.todos))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const addTodo = () => {
    fetch(config.REST_BACKEND_POST_URL, {
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
    fetch(config.REST_BACKEND_PUT_URL + `/${todoId}`, {
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
    fetch(config.REST_BACKEND_DELETE_URL + `/${todoId}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return {
    todos,
    newTodoText,
    setNewTodoText,
    addTodo,
    handleDoubleClick,
  };
}
