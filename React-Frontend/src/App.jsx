import {react} from 'react';
import Todo1 from "./components/restApi/rUI";
import Todo2 from "./components/graphql/gqlUI";
import "./App.css";

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
