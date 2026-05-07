import { useTodoLogic } from "../hooks/useTodoLogic";
import { useTheme } from "../hooks/useTheme";
import TodoItem from "./TodoItem";
import { type Todo } from "../types";

const TodoList = () => {
  const { todos, inputValue, setInputValue, handleAdd, handleDelete, handleToggle } = useTodoLogic();
  const { theme, toggleTheme } = useTheme();

  // 1. Add the logout logic
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.reload(); // This triggers the HOC to show the Login screen
  };

const incompleteCount = todos.filter(t => !t.completed).length;

  return (
    <div className={`todo-container ${theme}`}>
      <h3>You have {incompleteCount} tasks remaining</h3>
      <div className="todo-header">
        <button onClick={toggleTheme}>Toggle Theme</button>
        {/* 2. Add the Logout button */}
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      
      <h1>My Tasks</h1>
      
      <form onSubmit={handleAdd}>
        <input 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Add a task..."
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((item: Todo) => (
          <TodoItem 
            key={item.id} 
            item={item} 
            onToggle={handleToggle} 
            onDelete={handleDelete} 
          />
        ))}
      </ul>

    </div>
  );
};

export default TodoList;




