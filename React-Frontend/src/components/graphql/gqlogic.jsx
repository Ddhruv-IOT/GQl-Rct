import { useState } from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO_MUTATION,
} from "./quiries/quiries";
import "../style/style.scss";

export function Todo2Logic() {
  const [newItem, setNewItem] = useState("");

  const { loading, error, data } = useQuery(GET_TODOS);

  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const [updateTodoMutation] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const [deleteTodoMutation] = useMutation(DELETE_TODO_MUTATION, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const handleAddTodo = async () => {
    await addTodo({
      variables: {
        item: {
          item: newItem,
        },
      },
    });
    setNewItem("");
  };

  const handleDoubleClick = (todo) => {
    Swal.fire({
      title: "Edit or Delete Todo",
      input: "text",
      inputValue: todo.item,
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      showDenyButton: true,
      denyButtonText: "Delete",
      showLoaderOnConfirm: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Update the todo
        try {
          await updateTodoMutation({
            variables: {
              updateTodoId: todo.id,
              edits: { item: result.value },
            },
          });
        } catch (error) {
          console.error("Error updating todo:", error);
        }
      } else if (result.isDenied) {
        // Delete the todo
        try {
          await deleteTodoMutation({
            variables: { deleteTodoId: todo.id },
          });
        } catch (error) {
          console.error("Error deleting todo:", error);
        }
      }
    });
  };
  return {
    loading,
    error,
    data,
    handleAddTodo,
    handleDoubleClick,
    newItem,
    setNewItem,
  };
}
