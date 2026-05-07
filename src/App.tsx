
// import { TodoLogic } from "./todoLogic"
import "./App.css"

// function App() {
 

//   return (
   
    
//   <TodoLogic></TodoLogic>
  
//   )
// }

// export default App

import TodoList from "./components/TodoList";
import { withAuth } from "./hoc/withAuth";
import "./App.css";

// 1. Wrap the TodoList with Authentication
// This version of the component will check for login status before rendering
const ProtectedTodoList = withAuth(TodoList);

function App() {
  return (
    <div className="app-main-container">
      {/* 2. Calling the protected component */}
      <ProtectedTodoList />
    </div>
  );
}

export default App;

