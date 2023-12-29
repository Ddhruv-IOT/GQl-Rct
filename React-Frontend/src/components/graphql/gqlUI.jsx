import {react} from 'react';
import { IoMdSend } from "react-icons/io";
import { Todo2Logic } from "./gqlogic";
import "../style/style.scss";

function Todo2() {
  const {
    loading,
    error,
    data,
    handleAddTodo,
    handleDoubleClick,
    newItem,
    setNewItem,
  } = Todo2Logic();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
