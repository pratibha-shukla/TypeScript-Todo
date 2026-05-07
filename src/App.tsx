
// import { TodoLogic } from "./todoLogic"
import "./App.css"

// function App() {
 

//   return (
   
    
//   <TodoLogic></TodoLogic>
  
//   )
// }

// export default App

import TodoLogic from "./components/TodoList"; // Removed { } if it's a default export
import { withAuth } from "./hoc/withAuth";
import { withErrorBoundary } from "./hoc/withErrorBoundry"

// Layer 1: Security
// Fixed: Changed TodoList to TodoLogic to match your import
const ProtectedTodo = withAuth(TodoLogic);

// Layer 2: Error Protection
const SafeTodo = withErrorBoundary(ProtectedTodo);

function App() {
  return (
    <div className="App">
       <SafeTodo />
    </div>
  );
}

export default App;



