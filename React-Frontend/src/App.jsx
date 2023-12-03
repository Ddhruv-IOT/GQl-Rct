import { useState } from "react";
import Todo1 from "./components/restApi/restapi";
import "./App.css";
import Todo2 from "./components/graphql/gql";

function App() {
  return (
    <>
      <div className="main">
        <div className="box">
          <Todo1 />
        </div>
        <div className="box">
          <Todo2 />
        </div>
      </div>
    </>
  );
}

export default App;
