import { IoMdSend } from "react-icons/io";
import { Todo1Logic } from "./rlogic";
import "../style/style.scss";

function Todo1() {
  const { todos, newTodoText, setNewTodoText, addTodo, handleDoubleClick } =
    Todo1Logic();

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
