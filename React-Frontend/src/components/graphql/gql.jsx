// import React, { useState, useEffect } from "react";
// import { IoMdSend } from "react-icons/io";
// import Swal from "sweetalert2";
// import { useQuery, useMutation, gql } from "@apollo/client";

// const GET_TODOS = gql`
//   query Query {
//     todos {
//       item
//       id
//     }
//   }
// `;

// const ADD_TODO = gql`
//   mutation Mutation($item: AddInputItem) {
//     addTodo(item: $item) {
//       item
//     }
//   }
// `;

// const UPDATE_TODO = gql`
//   mutation Mutation($updateTodoId: ID!, $edits: EditTodoItem!) {
//     updateTodo(id: $updateTodoId, edits: $edits) {
//       item
//     }
//   }
// `;

// const DELETE_TODO_MUTATION = gql`
//   mutation DeleteTodo($deleteTodoId: ID!) {
//     deleteTodo(id: $deleteTodoId) {
//       id
//       item
//     }
//   }
// `;

// function Todo2() {
//   const [newItem, setNewItem] = useState("");
//   const [selectedTodo, setSelectedTodo] = useState(null);

//   const { loading, error, data } = useQuery(GET_TODOS);

//   const [addTodo] = useMutation(ADD_TODO, {
//     refetchQueries: [{ query: GET_TODOS }],
//   });

//   const updateTodoMutation = useMutation(UPDATE_TODO, {
//     refetchQueries: [{ query: GET_TODOS }],
//   });

//   const deleteTodoById = async (deleteTodoId) => {
//     const [deleteTodo] = useMutation(DELETE_TODO_MUTATION);

//     try {
//       const { data } = await deleteTodo({
//         variables: { deleteTodoId },
//       });

//       console.log("Deleted todo:", data.deleteTodo);
//     } catch (error) {
//       console.error("Error deleting todo:", error);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const handleAddTodo = async () => {
//     await addTodo({
//       variables: {
//         item: {
//           item: newItem,
//         },
//       },
//     });
//     setNewItem("");
//   };

//   const handleDoubleClick = (todo) => {
//     Swal.fire({
//       title: "Edit or Delete Todo",
//       input: "text",
//       inputValue: todo.item,
//       showCancelButton: true,
//       confirmButtonText: "Update",
//       cancelButtonText: "Cancel",
//       showDenyButton: true,
//       denyButtonText: "Delete",
//       showLoaderOnConfirm: true,
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         // updateTodo1(todo.id, todo.item)
//       } else if (result.isDenied) {
//         // ssd(todo.id)
//         deleteTodoById(todo.id);
//         // deleteTodo()
//       }
//     });
//   };

//   return (
//     <div className="main1">
//       <p className="a">Todo List - 2 </p>
//       <p className="b">GraphQL</p>

//       <div className="chat-container">
//         <ul>
//           {data.todos.map((todo) => (
//             <li key={todo.id} onDoubleClick={() => handleDoubleClick(todo)}>
//               {todo.item}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="ip-tab">
//         <input
//           type="text"
//           placeholder="Enter the TODO Item"
//           value={newItem}
//           onChange={(e) => setNewItem(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") handleAddTodo();
//           }}
//         />
//         <span className="pnd"></span>
//         <div className="btn">
//           <IoMdSend onClick={handleAddTodo} className="bt-icn" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Todo2;



import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import Swal from "sweetalert2";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_TODOS = gql`
  query Query {
    todos {
      item
      id
    }
  }
`;

const ADD_TODO = gql`
  mutation Mutation($item: AddInputItem!) {
    addTodo(item: $item) {
      item
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodoMutation($updateTodoId: ID!, $edits: EditTodoItem!) {
    updateTodo(id: $updateTodoId, edits: $edits) {
      item
    }
  }
`;

const DELETE_TODO_MUTATION = gql`
  mutation DeleteTodoMutation($deleteTodoId: ID!) {
    deleteTodo(id: $deleteTodoId) {
      id
      item
    }
  }
`;

function Todo2() {
  const [newItem, setNewItem] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_TODOS);

  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const [updateTodoMutation] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const [deleteTodoMutation] = useMutation(DELETE_TODO_MUTATION, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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

  return (
    <div className="main1">
      <p className="a">Todo List - 2 </p>
      <p className="b">GraphQL</p>

      <div className="chat-container">
        <ul>
          {data.todos.map((todo) => (
            <li key={todo.id} onDoubleClick={() => handleDoubleClick(todo)}>
              {todo.item}
            </li>
          ))}
        </ul>
      </div>

      <div className="ip-tab">
        <input
          type="text"
          placeholder="Enter the TODO Item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTodo();
          }}
        />
        <span className="pnd"></span>
        <div className="btn">
          <IoMdSend onClick={handleAddTodo} className="bt-icn" />
        </div>
      </div>
    </div>
  );
}

export default Todo2;
